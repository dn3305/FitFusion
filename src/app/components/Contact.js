'use client';

import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulaire soumis !");
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="bg-black text-white py-16 px-6 lg:px-48">
      <div className="container mx-auto space-y-16">
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"  
          viewport={{ once: false, amount: 0.3 }} 
        >
          {[
            { icon: <FaPhoneAlt />, text: "+91 98765 43210" },
            { icon: <FaEnvelope />, text: "info@fitelite.com" },
            { icon: <FaMapMarkerAlt />, text: "123 Wellness Street, Bangalore, India" },
            { icon: <FaGlobe />, text: "website.name" },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="group bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 hover:bg-red-500"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}  
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl text-red-500 group-hover:text-white transition duration-300">
                  {card.icon}
                </div>
                <p className="text-lg">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

 
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between lg:px-12 space-y-8 lg:space-y-0 lg:space-x-12"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}  
          transition={{ duration: 1 }}
        >
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-extrabold text-red-500">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="4"
                ></textarea>
              </div>
              <div className="text-center">
                <motion.button
                  type="submit"
                  className="bg-red-500 text-black py-3 px-6 text-lg font-semibold transform transition duration-300 hover:scale-105"
                  whileHover={{ scale: 1.1 }}
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </div>

          <div className="lg:w-1/2">
            <motion.iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.388005732674!2d77.63786563293765!3d12.909070858634305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14916cde733d%3A0xfa671b003973ca21!2sZest%20Fitness%20Studio!5e1!3m2!1sen!2sin!4v1738488478803!5m2!1sen!2sin"
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            ></motion.iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
