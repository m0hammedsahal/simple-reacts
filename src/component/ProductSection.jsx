import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductForm from "./ProductForm"; // Import ProductForm
import CartButton from "./ecomm/CartButton";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products/") // Django API URL
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white">Loading products...</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-6 bg-gray-900"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400">
        Our Products
      </h2>

      {/* Pass setProducts to ProductForm */}
      <ProductForm setProducts={setProducts} />

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`http://127.0.0.1:8000${product.image}`} // Ensure correct URL
              alt={product.name}
              className="mx-auto mb-4 rounded h-40 w-40 object-cover"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-yellow-400 text-lg">${product.price}</p>
            <CartButton/>
          </motion.div>
           
        ))}
      </div>
    </motion.section>
  );
}

export default ProductSection;
