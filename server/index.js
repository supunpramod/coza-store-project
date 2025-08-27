import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";



// ======== ES Module "__dirname" Setup =========
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========== App & Middleware =================
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
dotenv.config();

// Serve images statically from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =========== MongoDB Connection ===============

mongoose.connect(process.env.MONGO_URI)
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


// --- Product Model ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true }, // Or Number if you don't use "$"
  category: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

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

// ▶ DELETE a contact message by ID
app.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    res.status(200).json({ message: 'Message deleted successfully.', data: deletedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message.', error: error.message });
  }
});


// User Schema with Roles
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // allowed values
    default: 'user' // default role
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);


// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-123';







// JWT Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Admin Middleware
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
















// Routes
// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Return response without password
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});





// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token (include role in payload)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send response with role
    res.json({
      message: 'Login successful',
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      },
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});





// Protected route
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// ========= Start Server ==========
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
