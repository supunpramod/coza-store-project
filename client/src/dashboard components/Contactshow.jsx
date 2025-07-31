import React, { useEffect, useState } from 'react';

const Contactshow = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/messages') // change port if needed
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching messages:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded-lg  ">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Contact Messages</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg._id} className="border p-4 rounded shadow-sm bg-gray-50">
              <p className="font-semibold text-blue-600">{msg.email}</p>
              <p className="text-gray-700 mt-2">{msg.msg}</p>
              <p className="text-sm text-gray-400 mt-2">
                Sent on: {new Date(msg.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Contactshow;
