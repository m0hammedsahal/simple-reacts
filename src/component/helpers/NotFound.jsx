import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-9xl font-bold text-blue-500"
      >
        404
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-2xl md:text-4xl font-semibold mt-4"
      >
        Oops! Page Not Found
      </motion.h2>
      <p className="text-gray-400 text-lg mt-2">
        The page you are looking for does not exist.
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
