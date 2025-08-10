import React, { useEffect, useState } from 'react';

const Contactshow = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    fetch('http://localhost:3000/messages')
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching messages:', err);
        setLoading(false);
      });
  };

  // Delete message by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/messages/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessages(messages.filter((msg) => msg._id !== id));
      } else {
        const errorData = await res.json();
        console.error('Failed to delete:', errorData.message);
        alert('Failed to delete message.');
      }
    } catch (error) {
      console.error('Error deleting message:', error.message);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Contact Messages</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg._id} className="border p-4 rounded shadow-sm bg-gray-50 relative">
              <p className="font-semibold text-blue-600">{msg.email}</p>
              <p className="text-gray-700 mt-2">{msg.msg}</p>
              <p className="text-sm text-gray-400 mt-2">
                Sent on: {new Date(msg.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(msg._id)}
                className="absolute top-2 right-2 text-sm text-white px-2 py-1 rounded-md bg-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Contactshow;
