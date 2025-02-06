"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const router = useRouter();

  const plans = [
    {
      title: "Group Classes (60 min)",
      prices: [
        { id: "g1", frequency: "1x per week", price: "₹1600" },
        { id: "g2", frequency: "2x per week", price: "₹2800" },
        { id: "g3", frequency: "3x per week", price: "₹3000" },
      ],
    },
    {
      title: "Strength & Cardio Training (90 min)",
      prices: [
        { id: "s1", frequency: "2x per week", price: "₹6,500" },
        { id: "s2", frequency: "3x per week", price: "₹7000" },
        { id: "s3", frequency: "Annual", price: "₹18000" },
      ],
    },
    {
      title: "Kid's Fitness Classes",
      prices: [
        { id: "k1", frequency: "1x per week", price: "₹2,000" },
        { id: "k2", frequency: "2x per week", price: "₹2,800" },
        { id: "k3", frequency: "Annual", price: "₹7500" },
      ],
    },
  ];

  // State for controlling the subscription modal and selections
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Called when the subscribe button is clicked on a plan card.
  // Sets the plan and initializes the option.
  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setSelectedOption(plan.prices[0]); // default to the first pricing option
    setShowModal(true);
  };

  // Closes the modal and resets selections.
  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
    setSelectedOption(null);
  };

  // When confirming, save the selected subscription details and redirect to /checkout.
  const confirmSubscription = () => {
    const subscriptionData = {
      title: selectedPlan.title,
      option: selectedOption,
    };

    // Save to localStorage (or use your preferred state management)
    localStorage.setItem("selectedSubscription", JSON.stringify(subscriptionData));

    // Redirect to the checkout page (app/checkout/page.js)
    router.push("checkout");
  };

  return (
    <>
      <motion.div
        id="pricing"
        className="bg-black text-white flex flex-col items-center py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-8 text-center animate-pulse"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Pricing
        </motion.h1>
        <motion.div
          className="grid gap-8 md:grid-cols-3 w-full max-w-6xl px-4"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  {plan.title}
                </h2>
                <ul className="space-y-3">
                  {plan.prices.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.frequency}</span>
                      <span className="text-red-400 font-semibold">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <motion.div
                className="bg-red-400 text-black text-center py-3 font-semibold cursor-pointer hover:bg-red-500 transition"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleSubscribe(plan)}
              >
                Subscribe
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal for Option Selection */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded shadow-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Select Option</h2>
            <p className="mb-4">
              <strong>{selectedPlan.title}</strong>
            </p>
            <form>
              {selectedPlan.prices.map((option) => (
                <div key={option.id} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="pricingOption"
                      value={option.id}
                      checked={selectedOption?.id === option.id}
                      onChange={() => setSelectedOption(option)}
                      className="form-radio text-red-400"
                    />
                    <span className="ml-2">
                      {option.frequency} - {option.price}
                    </span>
                  </label>
                </div>
              ))}
            </form>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeModal}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-400 text-white rounded"
                onClick={confirmSubscription}
                type="button"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pricing;
