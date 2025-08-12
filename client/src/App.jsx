// component
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import React, { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Features from "./components/Features";
import Blog from "./components/Blog";
import About from "./components/About";
import Contact from "./components/Contact";

// dashboard components
import Dashboard from "./dashboard components/Dashboard.jsx";
import Sidebar from "./dashboard components/Sidebar.jsx";
import Topbar from "./dashboard components/Topbar.jsx";
import Productmanage from "./dashboard components/Productmanage.jsx"; 
import Blogmanage from "./dashboard components/Blogmanage.jsx";
import Contactshow from "./dashboard components/Contactshow.jsx";
import Registerpage from "./dashboard components/Registerpage.jsx";
import Loginpage from "./dashboard components/Loginpage.jsx";

// Dashboard Layout Component (මෙලෙසම තබන්න)
const DashboardLayout = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
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
      

      <Routes>
       <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/shop" element={<><Header /><Shop/><Footer /></>} />
        <Route path="/features" element={<><Header /><Features /><Footer /></>} />
        <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        

        {/* Dashboard Routes */}
        <Route
          element={
            <DashboardLayout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productmanage" element={<Productmanage />} />
          <Route path="/blogmanage" element={<Blogmanage />} />
          <Route path="/contactshow" element={<Contactshow />} />
          <Route path="/registerpage" element={<Registerpage />} />
          
          
        </Route>
        <Route path="/register" element={<Registerpage />} />
        <Route path="/login" element={<Loginpage />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center text-2xl mt-10">404 - Page Not Found</div>
          }
        />
      </Routes>
      

      
    </BrowserRouter>
  );
}

export default App;
