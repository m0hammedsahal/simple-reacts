import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/mark2.png";
import { motion } from "framer-motion";


function Navbar() {

  const data = [
    {
      label: "Home",
      to: "/",
      icon: <FaHome className="mr-2" />
    },
    {
      label: "about",
      to: "/about",
      icon: <FaInfoCircle className="mr-2" />

    },
    {
      label: "Contact",
      to: "/contact",
      icon: <FaEnvelope className="mr-2" />
    }
  ]

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold flex items-center"
        >
          <img className="w-10" src={logo} alt="" />
        </Link>

        <ul className="hidden md:flex space-x-6">
          {
            data.map((item,key)=> (
              <li>
                <Link 
                  to={item.to}
                  className="text-white flex items-center hover:text-gray-300 transition duration-300"
                >
                  {item.icon} {item.label}
                </Link>
                {/* <div className="hover:w-full transition duration-300" style={{backgroundColor: 'red', height: '3px', width:'0'}}></div> */}
              </li>
            ))
          }
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <motion.ul initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }} 
        className="md:hidden bg-blue-700 p-4 absolute top-16 left-0 w-full space-y-4 transition duration-300">
          {
            data.map((item,key)=> (
              <motion.li
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Link
                  to={item.to}
                  className="text-white flex items-center hover:text-gray-300 transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon} {item.label}
                </Link>
              </motion.li>
            ))
          }
        </motion.ul>
      )}
    </nav>
  );
}

export default Navbar;
