import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function BlogManage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    image: "",
    date: "",
    monthYear: "",
    title: "",
    desc: "",
    author: "Admin",
    categories: [],
  });
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("date", form.date);
    formData.append("monthYear", form.monthYear);
    formData.append("title", form.title);
    formData.append("desc", form.desc);
    formData.append("author", form.author);
    formData.append("categories", form.categories.join(','));

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/api/blogs/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${BASE_URL}/api/blogs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        image: "",
        date: "",
        monthYear: "",
        title: "",
        desc: "",
        author: "Admin",
        categories: [],
      });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error("Failed to save post", err);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      ...blog,
      image: "", // prevent sending old image
      categories: blog.categories || [],
    });
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Blog Post" : "Create Blog Post"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-12"
        encType="multipart/form-data"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full border p-2 rounded-md"
          required={!editingId}
        />
        {form.image && typeof form.image === "object" && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            placeholder="Date (e.g. 22)"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            name="monthYear"
            value={form.monthYear}
            onChange={handleChange}
            placeholder="Month Year (e.g. Jan 2018)"
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded-md w-full"
          required
        />
        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="border p-2 rounded-md w-full"
        />
        <input
          name="categories"
          value={form.categories.join(",")}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, categories: e.target.value.split(",") }))
          }
          placeholder="Categories (comma separated)"
          className="border p-2 rounded-md w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">All Blog Posts</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={`${BASE_URL}${blog.image}`}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-bold mb-1">{blog.title}</h4>
            <p className="text-sm text-gray-500 mb-2">
              {blog.date} {blog.monthYear} — {blog.author}
            </p>
            <p className="text-gray-700 mb-2">{blog.desc}</p>
            <p className="text-sm text-gray-600">
              Categories: {blog.categories.join(", ")}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(blog)}
                className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogManage;
