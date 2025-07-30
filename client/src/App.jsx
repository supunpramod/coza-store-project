import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Features from "./components/Features";
import Blog from "./components/Blog";
import About from "./components/About";
import Contact from "./components/Contact";

// Dashboard Components
import Dashboard from "./dashboard components/Dashboard.jsx";
import Sidebar from './dashboard components/Sidebar.jsx';
import Topbar from "./dashboard components/Topbar.jsx";

// Dashboard Layout Component (මෙලෙසම තබන්න)
const DashboardLayout = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar sidebarOpen={sidebarOpen} />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet /> {/* Nested routes render කරයි */}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/features" element={<Features />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboard Routes */}
        <Route
          element={<DashboardLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={<div className="text-center text-2xl mt-10">404 - Page Not Found</div>}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
