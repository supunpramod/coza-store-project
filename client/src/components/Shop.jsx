import React, { useState } from 'react';


const Shop = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleFilter = () => setShowFilter(!showFilter);

  const products = [
    { id: 1, name: 'Esprit Ruffle Shirt', price: '$16.64', category: 'women', image: 'product-01.jpg' },
    { id: 2, name: 'Herschel supply', price: '$35.31', category: 'women', image: 'product-02.jpg' },
    { id: 3, name: 'Only Check Trouser', price: '$25.50', category: 'men', image: 'product-03.jpg' },
    { id: 4, name: 'Classic Trench Coat', price: '$75.00', category: 'women', image: 'product-04.jpg' },
    { id: 5, name: 'Front Pocket Jumper', price: '$34.75', category: 'women', image: 'product-05.jpg' },
    { id: 6, name: 'Vintage Inspired Classic', price: '$93.20', category: 'watches', image: 'product-06.jpg' },
    { id: 7, name: 'Shirt in Stretch Cotton', price: '$52.66', category: 'women', image: 'product-07.jpg' },
    { id: 8, name: 'Pieces Metallic Printed', price: '$18.96', category: 'women', image: 'product-08.jpg' },
    { id: 9, name: 'Converse All Star Hi Plimsolls', price: '$75.00', category: 'shoes', image: 'product-09.jpg' },
    { id: 10, name: 'Femme T-Shirt In Stripe', price: '$25.85', category: 'women', image: 'product-10.jpg' },
    { id: 11, name: 'Herschel supply', price: '$63.16', category: 'men', image: 'product-11.jpg' },
    { id: 12, name: 'Herschel supply', price: '$63.15', category: 'men', image: 'product-12.jpg' },
    { id: 13, name: 'T-Shirt with Sleeve', price: '$18.49', category: 'women', image: 'product-13.jpg' },
    { id: 14, name: 'Pretty Little Thing', price: '$54.79', category: 'women', image: 'product-14.jpg' },
    { id: 15, name: 'Mini Silver Mesh Watch', price: '$86.85', category: 'watches', image: 'product-15.jpg' },
    { id: 16, name: 'Square Neck Back', price: '$29.64', category: 'women', image: 'product-16.jpg' },
  ];

  return (
    <div className="bg-gray-100 mt-23 pb-140">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between pb-52">
          <div className="flex flex-wrap items-center mt-10 mb-10">
            <button className="text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md py-2 px-4 mr-8 mt-2 mb-2 bg-white border border-gray-300">
              All Products
            </button>
            <button className="text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md py-2 px-4 mr-8 mt-2 mb-2">
              Women
            </button>
            <button className="text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md py-2 px-4 mr-8 mt-2 mb-2">
              Men
            </button>
            <button className="text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md py-2 px-4 mr-8 mt-2 mb-2">
              Bag
            </button>
            <button className="text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md py-2 px-4 mr-8 mt-2 mb-2">
              Shoes
            </button>
            <button className="text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md py-2 px-4 mr-8 mt-2 mb-2">
              Watches
            </button>
          </div>

          <div className="flex items-center mt-10 mb-10">
            <button 
              onClick={toggleFilter}
              className="flex items-center text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md py-2 px-4 mr-4 mt-2 mb-2 border border-gray-300"
            >
              <i className="zmdi zmdi-filter-list mr-2"></i>
              <i className="zmdi zmdi-close hidden mr-2"></i>
              Filter
            </button>

            <button 
              onClick={toggleSearch}
              className="flex items-center text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md py-2 px-4 mt-2 mb-2 border border-gray-300"
            >
              <i className="zmdi zmdi-search mr-2"></i>
              <i className="zmdi zmdi-close hidden mr-2"></i>
              Search
            </button>
          </div>
          
          {/* Search product */}
          {showSearch && (
            <div className="w-full pt-10 pb-15">
              <div className="flex items-center border border-gray-300 rounded-md pl-4">
                <button className="w-10 h-10 flex items-center justify-center">
                  <i className="zmdi zmdi-search"></i>
                </button>
                <input 
                  className="text-base font-normal text-gray-700 w-full h-10 pl-3 pr-4" 
                  type="text" 
                  placeholder="Search"
                />
              </div>  
            </div>
          )}

          {/* Filter */}
          {showFilter && (
            <div className="w-full pt-10">
              <div className="flex flex-wrap bg-white w-full p-6 md:p-10">
                <div className="w-full md:w-1/4 pr-4 pb-6">
                  <div className="text-lg font-semibold text-gray-900 pb-4">
                    Sort By
                  </div>
                  <ul>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Default
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Popularity
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Average rating
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
                        Newness
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Price: Low to High
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Price: High to Low
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="w-full md:w-1/4 pr-4 pb-6">
                  <div className="text-lg font-semibold text-gray-900 pb-4">
                    Price
                  </div>
                  <ul>
                    <li className="pb-2">
                      <a href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
                        All
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        $0.00 - $50.00
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        $50.00 - $100.00
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        $100.00 - $150.00
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        $150.00 - $200.00
                      </a>
                    </li>
                    <li className="pb-2">
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        $200.00+
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="w-full md:w-1/4 pr-4 pb-6">
                  <div className="text-lg font-semibold text-gray-900 pb-4">
                    Color
                  </div>
                  <ul>
                    <li className="pb-2">
                      <span className="text-lg mr-2" style={{ color: '#222' }}>
                        <i className="zmdi zmdi-circle"></i>
                      </span>
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Black
                      </a>
                    </li>
                    <li className="pb-2">
                      <span className="text-lg mr-2" style={{ color: '#4272d7' }}>
                        <i className="zmdi zmdi-circle"></i>
                      </span>
                      <a href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
                        Blue
                      </a>
                    </li>
                    <li className="pb-2">
                      <span className="text-lg mr-2" style={{ color: '#b3b3b3' }}>
                        <i className="zmdi zmdi-circle"></i>
                      </span>
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Grey
                      </a>
                    </li>
                    <li className="pb-2">
                      <span className="text-lg mr-2" style={{ color: '#00ad5f' }}>
                        <i className="zmdi zmdi-circle"></i>
                      </span>
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Green
                      </a>
                    </li>
                    <li className="pb-2">
                      <span className="text-lg mr-2" style={{ color: '#fa4251' }}>
                        <i className="zmdi zmdi-circle"></i>
                      </span>
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        Red
                      </a>
                    </li>
                    <li className="pb-2">
                      <span className="text-lg mr-2" style={{ color: '#aaa' }}>
                        <i className="zmdi zmdi-circle-o"></i>
                      </span>
                      <a href="#" className="text-base font-normal text-gray-600 hover:text-gray-900">
                        White
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="w-full md:w-1/4 pb-6">
                  <div className="text-lg font-semibold text-gray-900 pb-4">
                    Tags
                  </div>
                  <div className="flex flex-wrap pt-4 -mr-1 -mb-2">
                    <a href="#" className="flex items-center justify-center text-sm font-normal text-gray-600 hover:text-white hover:bg-gray-900 rounded-md px-4 py-2 mr-2 mb-2 border border-gray-300">
                      Fashion
                    </a>
                    <a href="#" className="flex items-center justify-center text-sm font-normal text-gray-600 hover:text-white hover:bg-gray-900 rounded-md px-4 py-2 mr-2 mb-2 border border-gray-300">
                      Lifestyle
                    </a>
                    <a href="#" className="flex items-center justify-center text-sm font-normal text-gray-600 hover:text-white hover:bg-gray-900 rounded-md px-4 py-2 mr-2 mb-2 border border-gray-300">
                      Denim
                    </a>
                    <a href="#" className="flex items-center justify-center text-sm font-normal text-gray-600 hover:text-white hover:bg-gray-900 rounded-md px-4 py-2 mr-2 mb-2 border border-gray-300">
                      Streetstyle
                    </a>
                    <a href="#" className="flex items-center justify-center text-sm font-normal text-gray-600 hover:text-white hover:bg-gray-900 rounded-md px-4 py-2 mr-2 mb-2 border border-gray-300">
                      Crafts
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {products.map((product) => (
            <div key={product.id} className="pb-35">
              <div className="relative group">
                <div className="overflow-hidden">
                  <img 
                    src={`/images/${product.image}`} 
                    alt={product.name} 
                    className="w-full h-auto group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center justify-center text-base font-normal text-white bg-black bg-opacity-80 rounded-md py-2 px-6">
                    Quick View
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-between pt-4">
                <div className="w-3/4">
                  <a href="#" className="text-base font-normal text-gray-700 hover:text-gray-900">
                    {product.name}
                  </a>
                  <div className="text-base font-medium text-gray-500">
                    {product.price}
                  </div>
                </div>

                <div className="w-1/4 flex justify-end pt-1">
                  <button className="relative">
                    <img className="w-5 h-5" src="/images/icons/icon-heart-01.png" alt="Wishlist" />
                    <img className="w-5 h-5 absolute top-0 left-0 opacity-0 hover:opacity-100" src="/images/icons/icon-heart-02.png" alt="Wishlist" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center w-full pt-6">
          <button className="flex items-center justify-center text-lg font-normal text-white bg-gray-800 hover:bg-gray-900 rounded-md py-3 px-8 mb-8 ">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;