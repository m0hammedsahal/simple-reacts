import React from "react";
import { motion } from "framer-motion";

function DataSection({ title, data, loading, error }) {
  if (loading) return <p className="text-center text-white">Loading {title}...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-6 bg-gray-900"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400">
        {title}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {data.map((item) => (
          <motion.div
            key={item.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`http://127.0.0.1:8000${item.image}`}
              alt={item.name}
              className="mx-auto mb-4 rounded h-40 w-40 object-cover"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default DataSection;
