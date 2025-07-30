import express from 'express';
import mongoose from 'mongoose';
import itemRoutes from './routes/itemRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors()); 
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string (replace with your own)
const MONGO_URI = 'mongodb+srv://pramodsupun06:SUdCnqI7ZdMmV9st@cluster0.uodsnzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas (fixed version)
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

  app.use('/api', itemRoutes);

// // Define simple schema & model for testing
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// const User = mongoose.model('User', UserSchema);

// // POST route to add user
// app.post('/users', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const savedUser = await user.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // GET all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true }, // Use Number if not using "$"
  category: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// ====== ROUTES ======

// ▶ Add product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ▶ Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ▶ Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ▶ Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});










app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});