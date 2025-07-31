import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

const Productmanage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '' });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({ name: '', price: '', category: '', image: '' });
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{editId ? 'Update' : 'Add'} Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="image" placeholder="Image Filename (e.g., product-01.jpg)" value={form.image} onChange={handleChange} className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editId ? 'Update' : 'Add'}</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow-sm">
            <img src={`/images/${product.image}`} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="font-semibold">{product.name}</h3>
            <p>{product.price}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productmanage;
