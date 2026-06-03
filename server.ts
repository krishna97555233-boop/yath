import express from 'express';
import cors from 'cors';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'la-fitnesse-super-secret-key-123';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      console.log('Connected to MongoDB');
      // Seed admin user
      const adminExists = await User.findOne({ role: 'admin' });
      if (!adminExists) {
        const admin = new User({ name: 'Admin User', email: 'admin@lafitnesse.com', password: 'password123', role: 'admin' });
        await admin.save();
        console.log('Admin user seeded into MongoDB.');
      }
    })
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn('\\n⚠️ MONGODB_URI is not set. The database will not work.\\n');
}

// Mongoose Schemas
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  plan: String,
  status: { type: String, default: 'New' },
  submissionDate: { type: Date, default: Date.now }
});

// Helper to convert _id to id in JSON response
leadSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Lead = mongoose.model('Lead', leadSchema);

// User Schema for Authentication
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serviceId: Number,
  serviceName: String,
  date: String,
  status: { type: String, default: 'Confirmed' },
  bookingDate: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Mock DB Arrays
let users = [
  { id: '1', name: 'Admin User', email: 'admin@lafitnesse.com', password: 'password123', role: 'admin' },
];
let members = [];
let trainers = [
  { id: 't1', name: 'Rahul Sharma', qualification: 'Certified Crossfit Instructor', specialization: 'Strength Training', experience: '5 Years', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
  { id: 't2', name: 'Megha Singh', qualification: 'Yoga Alliance RYT 500', specialization: 'Yoga & Flexibility', experience: '8 Years', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600' }
];
let membershipPlans = [
  { id: 'm1', title: 'Monthly Plan', duration: 1, price: 2999, features: ['Gym Access', 'Locker Facility', 'Free Diet Chart'] },
  { id: 'm2', title: 'Quarterly Plan', duration: 3, price: 7999, features: ['Gym Access', 'Locker Facility', 'Free Diet Chart', '1 PT Session'] },
  { id: 'm3', title: 'Half-Yearly Plan', duration: 6, price: 14999, features: ['Gym Access', 'Locker Facility', 'Personalized Diet', '3 PT Sessions'] },
  { id: 'm4', title: 'Annual Plan', duration: 12, price: 24999, features: ['Gym Access', 'Locker Facility', 'Personalized Diet', '1 Month Freeze'] },
  { id: 'm5', title: 'Premium Personal Training Plan', duration: 1, price: 9999, features: ['Dedicated Trainer', 'Custom Diet Plan', 'Daily Tracking', 'Gym Access'] },
];
let gallery = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200', category: 'Workout Area' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200', category: 'Cardio Zone' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1200', category: 'Weight Training' }
];
let testimonials = [
  { id: 'ts1', name: 'Aarav Gupta', content: 'Best gym in Noida. The equipment is top-notch and trainers are very helpful.', rating: 5 },
  { id: 'ts2', name: 'Priya Verma', content: 'Lost 10kgs in 3 months! Highly recommend their personal training.', rating: 5 }
];
let blogs = [
  { id: 'b1', title: '5 Essential Post-Workout Meals', snippet: 'Discover the best foods for muscle recovery...', content: 'Full content here', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600', date: 'Oct 15, 2024' },
];

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Auth API
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
});
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email exists' });
    const newUser = new User({ name, email, password, role: 'user' });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const dec = jwt.verify(token, SECRET_KEY);
    req.user = dec;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
};

// Public APIs
app.get('/api/trainers', (req, res) => res.json(trainers));
app.get('/api/plans', (req, res) => res.json(membershipPlans));
app.get('/api/gallery', (req, res) => res.json(gallery));
app.get('/api/testimonials', (req, res) => res.json(testimonials));
app.get('/api/blogs', (req, res) => res.json(blogs));
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, plan } = req.body;
    const newLead = new Lead({ name, email, phone, message, plan });
    await newLead.save();
    res.json({ success: true, lead: newLead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

// Booking APIs
app.post('/api/bookings', authMiddleware, async (req, res) => {
  try {
    const { serviceId, serviceName, date } = req.body;
    const newBooking = new Booking({
      userId: req.user.id,
      serviceId,
      serviceName,
      date
    });
    await newBooking.save();
    res.json({ success: true, booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/api/bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.get('/api/admin/bookings', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email').sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch overall bookings' });
  }
});

// Admin APIs
app.get('/api/admin/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const leadsCount = await Lead.countDocuments({ status: 'New' });
    res.json({
      totalMembers: members.length,
      activeMemberships: members.filter(m => m.status === 'active').length,
      revenue: 125000, 
      newLeads: leadsCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});
app.get('/api/admin/leads', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ submissionDate: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});
app.put('/api/admin/leads/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Lead.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update lead' });
  }
});
app.delete('/api/admin/leads/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});
app.get('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const allUsers = await User.find({}, { password: 0 });
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Determine __dirname in ESM or CJS effectively
    // Since we bundle via esbuild to CJS, __dirname will be available.
    let distPath;
    try {
      distPath = path.join(__dirname, '..', 'dist'); // if server is in dist/
    } catch(e) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      distPath = path.join(__dirname, 'dist');
    }
    
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
