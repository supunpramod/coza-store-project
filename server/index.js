import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ======== ES Module "__dirname" Setup =========
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========== App & Middleware =================
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Serve images statically from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =========== MongoDB Connection ===============
const MONGO_URI = 'mongodb+srv://pramodsupun06:SUdCnqI7ZdMmV9st@cluster0.uodsnzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected 🟢"))
  .catch((err) => console.error("MongoDB connection error:", err));

// =========== Multer Setup for Blog Images ============
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// =========== Mongoose Schemas =======================

// --- BlogPost Model ---
const blogPostSchema = new mongoose.Schema({
  image: { type: String, required: true },
  date: { type: String, required: true },
  monthYear: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  categories: { type: [String], default: ['Fashion', 'StreetStyle', 'Couple'] },
  commentsCount: { type: Number, default: 0 },
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// --- Product Model ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true }, // Or Number if you don't use "$"
  category: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// ======================= ROUTES =============================

// --- BLOG ROUTES ---

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single blog
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create blog (with image upload)
app.post('/api/blogs', upload.single('image'), async (req, res) => {
  try {
    const { date, monthYear, title, desc, author, categories } = req.body;
    const newPost = new BlogPost({
      image: `/uploads/${req.file.filename}`,
      date,
      monthYear,
      title,
      desc,
      author,
      categories: categories ? categories.split(',') : undefined,
    });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update blog (optionally with new image)
app.put('/api/blogs/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    if (updateData.categories && typeof updateData.categories === 'string') {
      updateData.categories = updateData.categories.split(',');
    }
    const updated = await BlogPost.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete blog (and delete image file)
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (post && post.image) {
      const filePath = path.join(__dirname, post.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PRODUCT ROUTES ---

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// contacts
const contactMessageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    msg: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

// ▶ POST a contact message
app.post('/messages', async (req, res) => {
  try {
    const { email, msg } = req.body;

    if (!email || !msg) {
      return res.status(400).json({ message: 'Email and message are required.' });
    }

    const newMessage = new ContactMessage({ email, msg });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully!', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
});

// ▶ GET all contact messages (optional)
app.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages.', error: error.message });
  }
});




// ========= Start Server ==========
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
