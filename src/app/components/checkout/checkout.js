"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

// Available services
const availableServices = [
  {
    id: 1,
    name: "Group Classes (60 min)",
    options: [
      { id: "1a", frequency: "1x per week", price: 1600 },
      { id: "1b", frequency: "2x per week", price: 2800 },
      { id: "1c", frequency: "3x per week", price: 3000 },
    ],
  },
  {
    id: 2,
    name: "Strength & Cardio Training (90 min)",
    options: [
      { id: "2a", frequency: "2x per week", price: 6500 },
      { id: "2b", frequency: "3x per week", price: 7000 },
      { id: "2c", frequency: "Annual", price: 18000 },
    ],
  },
  {
    id: 3,
    name: "Kid's Fitness Classes",
    options: [
      { id: "3a", frequency: "1x per week", price: 2000 },
      { id: "3b", frequency: "2x per week", price: 2800 },
      { id: "3c", frequency: "Annual", price: 7500 },
    ],
  },
];

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Add a service option to the cart
  const handleAddToCart = (service, option) => {
    const item = {
      id: option.id,
      name: service.name,
      option: option.frequency,
      price: option.price,
      quantity: 1,
    };
    setCart((prev) => [...prev, item]);
  };

  // Remove an item from the cart
  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle customer input change
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Simulate checkout and then redirect to the dynamic receipt page
  const handleCheckout = () => {
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!customer.name || !customer.email || !customer.phone) {
      setError("Please fill in all customer details.");
      return;
    }

    setError("");
    setIsProcessing(true);

    setTimeout(() => {
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const transactionId = Math.floor(Math.random() * 1000000).toString();
      const receiptData = {
        transactionId,
        date: new Date().toLocaleString(),
        items: cart,
        total,
        customer,
      };

      // Store the receipt data in localStorage (for demo purposes)
      localStorage.setItem("receipt", JSON.stringify(receiptData));

      // Redirect to the dynamic receipt route
      router.push(`/receipt/${transactionId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        Checkout
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Available Services */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Services</h2>
          {availableServices.map((service) => (
            <div key={service.id} className="mb-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <ul>
                {service.options.map((option) => (
                  <li
                    key={option.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {option.frequency} - ₹{option.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-red-400 text-black px-3 py-1 rounded"
                      onClick={() => handleAddToCart(service, option)}
                    >
                      Add to Cart
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cart and Customer Details */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="mb-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center mb-2 p-2 bg-gray-800 rounded"
                >
                  <div>
                    {item.name} - {item.option} (x{item.quantity})
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4">₹{item.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <FaTrash className="text-red-400" />
                    </motion.button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleCustomerChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleCustomerChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block mb-1">Phone:</label>
              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleCustomerChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
          </form>
          {error && <p className="text-red-400 mt-2">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-6 bg-red-400 text-black px-4 py-2 font-semibold"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Checkout"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
