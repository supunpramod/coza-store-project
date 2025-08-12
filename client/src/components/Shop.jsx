import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const categories = ['All Products', 'Women', 'Men', 'Bag', 'Shoes', 'Watches'];
const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Average rating', value: 'rating' },
  { label: 'Newness', value: 'newness' },
  { label: 'Price: Low to High', value: 'priceLow' },
  { label: 'Price: High to Low', value: 'priceHigh' },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedSort, setSelectedSort] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data);
      } catch (err) {
        setError('Error fetching products');
        console.error(err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filter and sort products based on user selection
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter (case-insensitive)
    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search filter (case-insensitive)
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting logic
    switch (selectedSort) {
      case 'popularity':
        filtered = filtered.slice().sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'rating':
        filtered = filtered.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newness':
        filtered = filtered.slice().sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case 'priceLow':
        filtered = filtered.slice().sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'priceHigh':
        filtered = filtered.slice().sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, selectedCategory, searchTerm, selectedSort]);

  return (
    <main className="bg-gray-100 py-6 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shop</h1>
        </header>

        {/* Filter & Search Controls */}
        <section className="flex flex-wrap justify-between items-center mb-8 gap-4">
          {/* Categories */}
          <nav aria-label="Product categories" className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm border transition ${
                  selectedCategory === cat
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
                aria-pressed={selectedCategory === cat}
                type="button"
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Filter & Search Toggles */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              aria-expanded={showFilter}
              aria-controls="filter-section"
              className="flex items-center border border-gray-300 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 text-sm"
              type="button"
            >
              {/* Replaced icon with emoji */}
              <span role="img" aria-label="filter" className="mr-2">⚙️</span> Filter
            </button>
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              aria-expanded={showSearch}
              aria-controls="search-bar"
              className="flex items-center border border-gray-300 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 text-sm"
              type="button"
            >
              {/* Replaced icon with emoji */}
              <span role="img" aria-label="search" className="mr-2">🔍</span> Search
            </button>
          </div>
        </section>

        {/* Search Bar */}
        {showSearch && (
          <section
            id="search-bar"
            className="w-full mb-8"
            aria-label="Search products"
          >
            <div className="flex items-center border border-gray-300 rounded-md pl-4">
              <button
                aria-label="Search icon"
                className="w-10 h-10 flex items-center justify-center text-gray-500"
                type="button"
              >
                🔍
              </button>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full h-10 pl-3 pr-4 text-sm text-gray-700 outline-none"
                autoFocus
              />
            </div>
          </section>
        )}

        {/* Filter Section */}
        {showFilter && (
          <section
            id="filter-section"
            className="w-full mb-8 bg-white p-6 md:p-10 grid md:grid-cols-4 gap-6 text-sm text-gray-700"
            aria-label="Filter options"
          >
            <div>
              <h3 className="text-base font-semibold mb-4">Sort By</h3>
              <ul className="space-y-2">
                {sortOptions.map(({ label, value }) => (
                  <li key={value}>
                    <button
                      onClick={() => setSelectedSort(value)}
                      className={`w-full text-left hover:text-gray-900 ${
                        selectedSort === value ? 'font-semibold text-gray-900' : ''
                      }`}
                      type="button"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Extend here with price, color filters, etc. */}
          </section>
        )}

        {/* Loading & Error states */}
        {loading && (
          <p className="text-center text-gray-500 my-10">Loading products...</p>
        )}
        {error && (
          <p className="text-center text-red-500 my-10">{error}</p>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <section
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            aria-live="polite"
          >
            {filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <article
                  key={product._id}
                  className="bg-white rounded-lg shadow-sm p-3 group"
                  tabIndex={0}
                  aria-label={`Product: ${product.name}, Price: $${Number(product.price).toFixed(2)}`}
                >
                  <div className="relative overflow-hidden rounded">
                    <img
                      src={`/images/${product.image || 'default.jpg'}`}
                      alt={product.name || 'Product Image'}
                      className="w-full h-auto group-hover:opacity-90 transition duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition">
                      <button
                        className="bg-white text-black px-6 py-2 rounded text-sm font-medium"
                        type="button"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-start pt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">${Number(product.price).toFixed(2)}</p>
                    </div>
                    <button
                      aria-label="Add to wishlist"
                      className="relative"
                      type="button"
                    >
                      <img
                        src="/images/icons/icon-heart-01.png"
                        alt="Wishlist icon"
                        className="w-5 h-5"
                      />
                      <img
                        src="/images/icons/icon-heart-02.png"
                        alt="Wishlist active icon"
                        className="w-5 h-5 absolute top-0 left-0 opacity-0 hover:opacity-100 transition"
                      />
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        )}

        {/* Load More Button */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="flex justify-center w-full pt-10">
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white text-base px-8 py-3 rounded-md"
              type="button"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;