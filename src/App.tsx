import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Membership from './pages/Membership';
import Trainers from './pages/Trainers';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import DietCafe from './pages/DietCafe';

import AdminLeads from './pages/admin/Leads';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="membership" element={<Membership />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cafe" element={<DietCafe />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
