import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const toggleSearch = () => setShowSearch((prev) => !prev);
  const toggleFilter = () => setShowFilter((prev) => !prev);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All Products', 'Women', 'Men', 'Bag', 'Shoes', 'Watches'];
  const sortOptions = [
    'Default',
    'Popularity',
    'Average rating',
    'Newness',
    'Price: Low to High',
    'Price: High to Low',
  ];

  return (
    <div className="bg-gray-100  pb-36">
      <div className="container mx-auto px-4">

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-between items-center py-10">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className="bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 text-sm"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={toggleFilter}
              className="flex items-center border border-gray-300 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 text-sm"
            >
              <i className="zmdi zmdi-filter-list mr-2" /> Filter
            </button>
            <button
              onClick={toggleSearch}
              className="flex items-center border border-gray-300 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 text-sm"
            >
              <i className="zmdi zmdi-search mr-2" /> Search
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="w-full py-4">
            <div className="flex items-center border border-gray-300 rounded-md pl-4">
              <button className="w-10 h-10 flex items-center justify-center text-gray-500">
                <i className="zmdi zmdi-search" />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="w-full h-10 pl-3 pr-4 text-sm text-gray-700 outline-none"
              />
            </div>
          </div>
        )}

        {/* Filter Section */}
        {showFilter && (
          <div className="w-full py-6">
            <div className="bg-white p-6 md:p-10 grid md:grid-cols-4 gap-6 text-sm text-gray-700">
              <div>
                <h3 className="text-base font-semibold mb-4">Sort By</h3>
                <ul className="space-y-2">
                  {sortOptions.map((opt) => (
                    <li key={opt}>
                      <a href="#" className="hover:text-gray-900">{opt}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Future: Add Price, Color, Tags etc here */}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-sm p-3 group">
              <div className="relative overflow-hidden rounded">
                <img
                  src={`/images/${product.image}`}
                  alt={product.name || 'Product Image'}
                  className="w-full h-auto group-hover:opacity-90 transition duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition">
                  <button className="bg-white text-black px-6 py-2 rounded text-sm font-medium">
                    Quick View
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-start pt-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
                <button className="relative">
                  <img
                    src="/images/icons/icon-heart-01.png"
                    alt="Wishlist"
                    className="w-5 h-5"
                  />
                  <img
                    src="/images/icons/icon-heart-02.png"
                    alt="Wishlist Active"
                    className="w-5 h-5 absolute top-0 left-0 opacity-0 hover:opacity-100 transition"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center w-full pt-10">
          <button className="bg-gray-800 hover:bg-gray-900 text-white text-base px-8 py-3 rounded-md">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
