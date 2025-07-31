import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ email: '', msg: '' });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, message: '', type: '' });

    try {
      const res = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, message: data.message, type: 'success' });
        setFormData({ email: '', msg: '' });
      } else {
        setStatus({ loading: false, message: data.message || 'Submission failed.', type: 'error' });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Server error. Try again later.', type: 'error' });
    }
  };

  return (
    <div>
      {/* Contact Section */}
      <section className="bg-white py-6 px-6">
        <div className='text-center pb-5'>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Contacts</h1>
        </div>

        <div className="max-w-6xl mx-auto flex flex-wrap gap-10">
          {/* Form Section */}
          <div className="w-full md:w-[48%] bg-gray-50 rounded-xl p-10 shadow-sm">
            <form onSubmit={handleSubmit}>
              <h4 className="text-2xl font-semibold text-center mb-8 text-gray-800">Send Us A Message</h4>

              <div className="relative mb-5">
                <input
                  className="w-full border border-gray-300 rounded-md px-5 py-3 pl-14 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email Address"
                />
                <img
                  src="/images/icons/icon-email.png"
                  alt="Email Icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
              </div>

              <div className="mb-6">
                <textarea
                  className="w-full border border-gray-300 rounded-md px-5 py-4 h-32 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  name="msg"
                  value={formData.msg}
                  onChange={handleChange}
                  required
                  placeholder="How Can We Help?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition duration-300"
              >
                {status.loading ? 'Submitting...' : 'Submit'}
              </button>

              {/* Status Message */}
              {status.message && (
                <p className={`mt-4 text-center ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>

          {/* Info Section */}
          <div className="w-full md:w-[48%] bg-gray-100 rounded-xl p-10 flex flex-col gap-10 shadow-sm">
            <div className="flex gap-4 items-start">
              <span className="text-2xl text-gray-500">
                <i className="lnr lnr-map-marker"></i>
              </span>
              <div>
                <h5 className="text-xl font-semibold text-gray-800">Address</h5>
                <p className="text-gray-600 mt-2">
                  Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-2xl text-gray-500">
                <i className="lnr lnr-phone-handset"></i>
              </span>
              <div>
                <h5 className="text-xl font-semibold text-gray-800">Let's Talk</h5>
                <p className="text-gray-600 mt-2">+1 800 1236879</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-2xl text-gray-500">
                <i className="lnr lnr-envelope"></i>
              </span>
              <div>
                <h5 className="text-xl font-semibold text-gray-800">Sale Support</h5>
                <p className="text-gray-600 mt-2">contact@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <div className="w-full h-[400px]">
        <div className="w-full h-full">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=40.691446,-73.886787&z=11&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
