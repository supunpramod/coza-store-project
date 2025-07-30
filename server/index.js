import express from 'express';
import mongoose from 'mongoose';
import itemRoutes from './routes/itemRoutes.js';

const app = express();
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











app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});