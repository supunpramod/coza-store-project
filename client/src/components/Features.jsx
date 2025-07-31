// components/Features.js
import React from 'react';
import { FaShippingFast, FaLock, FaSyncAlt, FaHeadset } from 'react-icons/fa';


const features = [
  {
    icon: <FaShippingFast size={28} className="text-blue-600" />,
    title: 'Fast & Free Delivery',
    description: 'Enjoy free shipping for all orders above $100, with fast and secure delivery.',
  },
  {
    icon: <FaLock size={28} className="text-green-600" />,
    title: 'Secure Payment',
    description: 'Your payment information is processed securely with encryption.',
  },
  {
    icon: <FaSyncAlt size={28} className="text-yellow-500" />,
    title: 'Easy Returns',
    description: 'Not satisfied? Return products within 30 days hassle-free.',
  },
  {
    icon: <FaHeadset size={28} className="text-purple-600" />,
    title: '24/7 Support',
    description: 'Our support team is available around the clock to assist you.',
  },
];

const Features = () => {
  return (
    <section className="py-6 bg-gray-100">
      <div className='text-center pb-5'><h1 className="text-3xl font-bold text-gray-800 mb-4">Features</h1></div>
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-12">Why Shop With Us?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div> 
      </div> 
    </section>
  );
};

export default Features;
