import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineHeart, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { MdShoppingCart } from 'react-icons/md';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const cartItems = [
    { name: 'White Shirt Pleat', price: 19, img: '/images/item-cart-01.jpg' },
    { name: 'Converse All Star', price: 39, img: '/images/item-cart-02.jpg' },
    { name: 'Nixon Porter Leather', price: 17, img: '/images/item-cart-03.jpg' },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <header className="w-full font-sans sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          <h1 className="text-black">CoZA</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-black text-sm font-medium">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/shop" className="hover:text-blue-500">Shop</Link>
          <Link to="/features" className="hover:text-blue-500">Features</Link>
          <Link to="/blog" className="hover:text-blue-500">Blog</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </nav>

        {/* Icons */}
        <div className="flex gap-4 items-center text-black">
          {/* Search */}
          <button onClick={() => setShowSearch(true)} className="hover:text-blue-600 transition">
            <AiOutlineSearch size={20} />
          </button>

          {/* Cart */}
          <button onClick={() => setShowCart(true)} className="relative hover:text-blue-600 transition">
            <MdShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>

          {/* Wishlist */}
          <button className="hover:text-blue-600 transition">
            <AiOutlineHeart size={20} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden hover:text-blue-600 transition"
            onClick={() => setShowMobileMenu(true)}
          >
            <AiOutlineMenu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Nav (Slide-in) */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setShowMobileMenu(false)} className="hover:text-red-500">
                <AiOutlineClose size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-black font-medium">
              <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <Link to="/shop" onClick={() => setShowMobileMenu(false)}>Shop</Link>
              <Link to="/features" onClick={() => setShowMobileMenu(false)}>Features</Link>
              <Link to="/blog" onClick={() => setShowMobileMenu(false)}>Blog</Link>
              <Link to="/about" onClick={() => setShowMobileMenu(false)}>About</Link>
              <Link to="/contact" onClick={() => setShowMobileMenu(false)}>Contact</Link>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 hover:text-red-500"
              onClick={() => setShowSearch(false)}
            >
              <AiOutlineClose size={20} />
            </button>
            <form className="flex items-center gap-2 mt-6">
              <AiOutlineSearch size={20} className="text-gray-400" />
              <input
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-1"
                type="text"
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
      )}

      {/* Cart Panel */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-80 h-full shadow-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="hover:text-red-500">
                <AiOutlineClose size={22} />
              </button>
            </div>

            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="flex gap-4 items-center border-b py-4">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">1 x ${item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right font-semibold text-gray-800">Total: ${total.toFixed(2)}</div>

            <div className="mt-4 flex flex-col gap-2">
              <Link to="/shoping-cart" className="bg-black text-white py-2 text-center rounded hover:bg-blue-700 transition">View Cart</Link>
              <Link to="/shoping-cart" className="bg-black text-white py-2 text-center rounded hover:bg-green-700 transition">Check Out</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
