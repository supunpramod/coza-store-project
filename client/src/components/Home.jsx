import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
 

  // State for sidebar and cart visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  // State for product filtering
  const [activeFilter, setActiveFilter] = useState('*');
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data
  const cartItems = [
    { id: 1, name: 'White Shirt Pleat', price: 19.00, image: 'item-cart-01.jpg' },
    { id: 2, name: 'Converse All Star', price: 39.00, image: 'item-cart-02.jpg' },
    { id: 3, name: 'Nixon Porter Leather', price: 17.00, image: 'item-cart-03.jpg' }
  ];

  const slides = [
    {
      image: 'slide-05.jpg',
      title: 'Women Collection 2018',
      subtitle: 'New arrivals',
      buttonText: 'Shop Now'
    },
    {
      image: 'slide-06.jpg',
      title: 'Men New-Season',
      subtitle: 'Jackets & Coats',
      buttonText: 'Shop Now'
    },
    {
      image: 'slide-07.jpg',
      title: 'Men Collection 2018',
      subtitle: 'NEW SEASON',
      buttonText: 'Shop Now'
    }
  ];

// slide auto change
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, 5000); // 5000ms = 5 seconds

  return () => clearInterval(interval); // Cleanup on unmount
}, [slides.length]);

  const banners = [
    { image: 'banner-04.jpg', title: 'Women', subtitle: 'New Trend', link: '/women' },
    { image: 'banner-05.jpg', title: 'Men', subtitle: 'New Trend', link: '/men' },
    { image: 'banner-07.jpg', title: 'Watches', subtitle: 'Spring 2018', link: '/watches' },
    { image: 'banner-08.jpg', title: 'Bags', subtitle: 'Spring 2018', link: '/bags' },
    { image: 'banner-09.jpg', title: 'Accessories', subtitle: 'Spring 2018', link: '/accessories' }
  ];

  const products = [
    { id: 1, name: 'Esprit Ruffle Shirt', price: 16.64, image: 'product-01.jpg', category: 'women', isNew: true },
    { id: 2, name: 'Herschel supply', price: 35.31, image: 'product-02.jpg', category: 'women' },
    { id: 3, name: 'Only Check Trouser', price: 25.50, image: 'product-03.jpg', category: 'men' },
    { id: 4, name: 'Classic Trench Coat', price: 75.00, image: 'product-04.jpg', category: 'women' },
    { id: 5, name: 'Front Pocket Jumper', price: 34.75, image: 'product-05.jpg', category: 'women' },
    { id: 6, name: 'Vintage Inspired Classic', price: 93.20, image: 'product-06.jpg', category: 'watches' },
    { id: 7, name: 'Shirt in Stretch Cotton', price: 52.66, image: 'product-07.jpg', category: 'women' },
    { id: 8, name: 'Pieces Metallic Printed', price: 18.96, image: 'product-08.jpg', category: 'women' },
    { id: 9, name: 'Converse All Star Hi Plimsolls', price: 75.00, image: 'product-09.jpg', category: 'shoes' },
    { id: 10, name: 'Femme T-Shirt In Stripe', price: 25.85, image: 'product-10.jpg', category: 'women' },
    { id: 11, name: 'Herschel supply', price: 63.16, image: 'product-11.jpg', category: 'men' },
    { id: 12, name: 'Herschel supply', price: 63.15, image: 'product-12.jpg', category: 'men' },
    { id: 13, name: 'T-Shirt with Sleeve', price: 18.49, image: 'product-13.jpg', category: 'women' },
    { id: 14, name: 'Pretty Little Thing', price: 54.79, image: 'product-14.jpg', category: 'women' },
    { id: 15, name: 'Mini Silver Mesh Watch', price: 86.85, image: 'product-15.jpg', category: 'watches' },
    { id: 16, name: 'Square Neck Back', price: 29.64, image: 'product-16.jpg', category: 'women' }
  ];

  // Helper functions
  const filteredProducts = activeFilter === '*' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="relative min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
          
          <div className="flex flex-col h-full p-6 bg-white relative">
            <div className="flex justify-end mb-8">
              <button onClick={() => setSidebarOpen(false)} className="text-3xl text-gray-600 hover:text-black">
                <i className="zmdi zmdi-close"></i>
              </button>
            </div>
            
            <div className="overflow-y-auto flex-grow">
              <ul className="space-y-4">
                <li>
                  <a href="index.html" className="text-gray-600 hover:text-black text-base">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black text-base">
                    My Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black text-base">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black text-base">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black text-base">
                    Refunds
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black text-base">
                    Help & FAQs
                  </a>
                </li>
              </ul>
              
              <div className="mt-8">
                <span className="text-lg font-medium">@ CozaStore</span>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div key={item} className="aspect-square bg-gray-200">
                      <a href={`/images/gallery-0${item}.jpg`} className="block w-full h-full bg-cover bg-center" 
                        style={{ backgroundImage: `url(/images/gallery-0${item}.jpg)` }}></a>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <span className="text-lg font-medium">About Us</span>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vulputate hendrerit. Praesent faucibus erat vitae rutrum gravida. Vestibulum tempus mi enim, in molestie sem fermentum quis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Cart */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setCartOpen(false)}></div>
          
          <div className="flex flex-col h-full p-6 bg-white relative">
            <div className="flex justify-between items-center pb-6 border-b">
              <span className="text-xl font-medium">Your Cart</span>
              <button onClick={() => setCartOpen(false)} className="text-3xl text-gray-600 hover:text-black">
                <i className="zmdi zmdi-close"></i>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto py-4">
              <ul className="space-y-6">
                {cartItems.map(item => (
                  <li key={item.id} className="flex border-b pb-6">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded">
                      <img src={`/images/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <a href="#" className="text-base hover:text-black">{item.name}</a>
                      <span className="block text-gray-600">1 x ${item.price.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-medium mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="/cart" className="bg-gray-800 text-white text-center py-3 px-4 hover:bg-gray-700 transition">
                  View Cart
                </a>
                <a href="/checkout" className="bg-gray-800 text-white text-center py-3 px-4 hover:bg-gray-700 transition">
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

     

      <main>
       {/* Hero Slider */}
<section className="relative">
  <div className="relative h-screen overflow-hidden">
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(/images/${slide.image})` }}
      >
        <div className="container h-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4">
              <span className="text-xl md:text-2xl">{slide.title}</span>
            </div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{slide.subtitle}</h2>
            </div>
            <div>
              <a
                href="/shop"
                className="inline-block bg-white text-black px-8 py-3 hover:bg-red-500 transition rounded-md"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    ))}

    {/* Left Arrow */}
<div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
  <button
    onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
    className="bg-white text-black rounded-md p-2 shadow hover:bg-red-500 hover:text-white transition"
  >
    <FontAwesomeIcon icon={faArrowLeft} />
  </button>
</div>


    {/* Right Arrow */}
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="bg-white  text-black rounded-md p-2 shadow hover:bg-red-500 hover:text-white transition "
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  </div>

  {/* Dots */}
  <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`}
      />
    ))}
  </div>
</section>

        {/* Banners */}
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img 
                  src={`/images/${banner.image}`} 
                  alt={banner.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-8 text-white">
                  <div>
                    <span className="text-xl md:text-2xl font-medium">{banner.title}</span>
                    <span className="block text-sm">{banner.subtitle}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={banner.link} className="text-sm font-medium border-b border-white pb-1 hover:text-red-500">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <section className="bg-gray-50 py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h3 className="text-3xl font-medium">Product Overview</h3>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {['*', 'women', 'men', 'bag', 'shoes', 'watches'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm ${activeFilter === filter ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    {filter === '*' ? 'All Products' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center px-4 py-2 bg-white rounded-full text-sm"
                >
                  <i className="zmdi zmdi-filter-list mr-2"></i>
                  Filter
                </button>
                <button 
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center px-4 py-2 bg-white rounded-full text-sm"
                >
                  <i className="zmdi zmdi-search mr-2"></i>
                  Search
                </button>
              </div>
            </div>
            
            {/* Search Panel */}
            {showSearch && (
              <div className="mb-6">
                <div className="flex border rounded-full overflow-hidden">
                  <button className="px-4 bg-gray-100">
                    <i className="zmdi zmdi-search"></i>
                  </button>
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="flex-grow px-4 py-2 outline-none"
                  />
                </div>
              </div>
            )}
            
            {/* Filter Panel */}
            {showFilter && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Sort By */}
                  <div>
                    <h4 className="font-medium mb-4">Sort By</h4>
                    <ul className="space-y-2">
                      {['Default', 'Popularity', 'Average rating', 'Newness', 'Price: Low to High', 'Price: High to Low'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-gray-600 hover:text-black">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Price */}
                  <div>
                    <h4 className="font-medium mb-4">Price</h4>
                    <ul className="space-y-2">
                      {['All', '$0.00 - $50.00', '$50.00 - $100.00', '$100.00 - $150.00', '$150.00 - $200.00', '$200.00+'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-gray-600 hover:text-black">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Color */}
                  <div>
                    <h4 className="font-medium mb-4">Color</h4>
                    <ul className="space-y-2">
                      {['Black', 'Blue', 'Grey', 'Green', 'Red', 'White'].map((color) => (
                        <li key={color} className="flex items-center">
                          <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ 
                            backgroundColor: color === 'Blue' ? '#4272d7' : 
                                            color === 'Grey' ? '#b3b3b3' : 
                                            color === 'Green' ? '#00ad5f' : 
                                            color === 'Red' ? '#fa4251' : 
                                            color === 'White' ? 'transparent' : '#222',
                            border: color === 'White' ? '1px solid #aaa' : 'none'
                          }}></span>
                          <a href="#" className="text-gray-600 hover:text-black">{color}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <h4 className="font-medium mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Fashion', 'Lifestyle', 'Denim', 'Streetstyle', 'Crafts'].map((tag) => (
                        <a key={tag} href="#" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                          {tag}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative group">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img 
                        src={`/images/${product.image}`} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-medium">New</span>
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                        Quick View
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <a href={`/product/${product.id}`} className="font-medium hover:text-gray-600">{product.name}</a>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <i className="zmdi zmdi-favorite-outline"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12 space-x-2">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">1</a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 rounded-full hover:bg-gray-100">2</a>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  );
};

export default Home;