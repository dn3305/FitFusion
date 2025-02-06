"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ReceiptPage = () => {
  const { transactionId } = useParams();
  const router = useRouter();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    // Retrieve the receipt data from localStorage
    const storedReceipt = localStorage.getItem("receipt");
    if (storedReceipt) {
      const parsedReceipt = JSON.parse(storedReceipt);
      // Check if the transactionId in the URL matches the stored receipt
      if (parsedReceipt.transactionId === transactionId) {
        setReceipt(parsedReceipt);
      } else {
        // If not, you might want to handle the mismatch (e.g., redirect)
        router.push("/checkout");
      }
    } else {
      // If there's no receipt data, redirect to checkout
      router.push("/checkout");
    }
  }, [transactionId, router]);

  if (!receipt) {
    return <p className="min-h-screen bg-black text-white p-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-4">Receipt</h1>
        <p>
          <strong>Transaction ID:</strong> {receipt.transactionId}
        </p>
        <p>
          <strong>Date:</strong> {receipt.date}
        </p>
        <p>
          <strong>Customer:</strong> {receipt.customer.name} (
          {receipt.customer.email}, {receipt.customer.phone})
        </p>
        <h2 className="text-2xl font-bold mt-4">Items Purchased:</h2>
        <ul className="mb-4">
          {receipt.items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>
                {item.name} - {item.option} (x{item.quantity})
              </span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold">Total: ₹{receipt.total}</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 bg-red-400 text-black px-4 py-2 font-semibold"
          onClick={() => {
            // Clear stored receipt and return to checkout for a new order
            localStorage.removeItem("receipt");
            router.push("/checkout");
          }}
        >
          New Order
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ReceiptPage;
