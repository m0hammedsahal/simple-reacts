import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaLightbulb, FaTools } from "react-icons/fa";
import ProductSection from "./ProductSection";
import Navbar from "./Navbar";

function Home() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar/>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-400">
          Welcome to <span className="text-yellow-400">My Website</span>
        </h1>
        <Link to="/about">
          <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md transition">
            Learn More
          </button>
        </Link>

        {/* Toggle Product Section Button */}
        {/* <button
          onClick={() => setShowProducts(!showProducts)}
          className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-lg font-semibold shadow-md transition"
        >
          {showProducts ? "Hide Products" : "Show Products"}
        </button> */}
      </section>

      {/* Conditionally Render Product Section */}
      {showProducts && <ProductSection />}
    </div>
  );
}

export default Home;
