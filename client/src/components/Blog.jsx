import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "http://localhost:3000";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      
      <section className="bg-gray-100 py-6">
        <div className='text-center pb-5'><h1 className="text-3xl font-bold text-gray-800 mb-4">Blogs</h1></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3 space-y-16">
              {blogs.map((post) => (
                <div key={post._id} className="bg-white p-4 shadow rounded-md">
                  <Link to={`/blog-detail/${post._id}`} className="relative block">
                    <img
                      src={`${BASE_URL}${post.image}`}
                      alt={post.title}
                      className="rounded-md w-full h-auto"
                    />
                    <div className="absolute top-4 left-4 bg-gray-800 text-white rounded-lg p-2 text-center w-16">
                      <p className="text-lg font-bold">{post.date}</p>
                      <p className="text-sm">{post.monthYear}</p>
                    </div>
                  </Link>
                  <div className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">
                      <Link to={`/blog-detail/${post._id}`} className="hover:text-blue-600">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{post.desc}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>By {post.author} | {post.categories?.join(', ')} | 8 Comments</span>
                      <Link to={`/blog-detail/${post._id}`} className="text-blue-600 hover:underline">
                        Continue Reading &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination (static for now) */}
              <div className="flex gap-2 pt-10">
                <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">1</button>
                <button className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 rounded-full hover:bg-gray-100">2</button>
              </div>
            </div>

            {/* Sidebar stays the same */}
            <div className="w-full lg:w-1/3 space-y-12">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border rounded-full py-2 px-4 pr-10 text-sm"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <i className="zmdi zmdi-search"></i>
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Categories</h4>
                <ul className="space-y-2">
                  {['Fashion', 'Beauty', 'Street Style', 'Life Style', 'DIY & Crafts'].map((cat, i) => (
                    <li key={i}>
                      <a href="#" className="text-sm text-gray-700 hover:text-blue-600">
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured Products */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Featured Products</h4>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4 mb-4">
                    <img src={`/images/product-min-0${item}.jpg`} alt="Product" className="w-16 h-16 rounded" />
                    <div>
                      <a href="#" className="text-sm text-gray-800 hover:text-blue-600">
                        Product Name {item}
                      </a>
                      <p className="text-xs text-gray-500 mt-1">${item * 10 + 9}.00</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Archive */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Archive</h4>
                <ul className="space-y-2">
                  {[
                    'July 2018 (9)', 'June 2018 (39)', 'May 2018 (29)', 'April 2018 (35)',
                    'March 2018 (22)', 'February 2018 (32)', 'January 2018 (21)', 'December 2017 (26)'
                  ].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-sm text-gray-700 hover:text-blue-600">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Fashion', 'Lifestyle', 'Denim', 'Streetstyle', 'Crafts'].map((tag, i) => (
                    <a
                      key={i}
                      href="#"
                      className="px-3 py-1 text-sm border rounded-full text-gray-600 hover:bg-gray-200"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
