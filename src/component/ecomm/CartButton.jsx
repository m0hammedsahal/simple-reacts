import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function CartButton({ productId }) {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateCart = async (newQuantity, remove = false) => {
    setLoading(true);
    try {
      if (remove) {
        await axios.post("http://127.0.0.1:8000/api/cart/remove/", {
          product_id: productId,
        });
        console.log("Item removed from cart");
      } else {
        await axios.post("http://127.0.0.1:8000/api/cart/add/", {
          product_id: productId,
          quantity: newQuantity,
        });
        console.log("Cart updated successfully");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await updateCart(newQuantity);
  };

  const handleDecrease = async () => {
    if (quantity === 1) {
      setQuantity(0);
      await updateCart(0, true);
    } else if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await updateCart(newQuantity);
    }
  };

  return (
    <div className="mt-4">
      {quantity === 0 ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          onClick={handleIncrease}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </motion.button>
      ) : (
        <div className="flex items-center justify-center space-x-4 bg-gray-700 p-2 rounded-lg">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
            onClick={handleDecrease}
            disabled={loading}
          >
            -
          </motion.button>
          <span className="text-white text-lg font-semibold">{quantity}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-all"
            onClick={handleIncrease}
            disabled={loading}
          >
            +
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default CartButton;

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// function CartButton() {
//   const [quantity, setQuantity] = useState(0);

//   const handleIncrease = () => setQuantity(quantity + 1);
//   const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 0);

//   return (
//     <div className="mt-4">
//       {quantity === 0 ? (
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
//           onClick={() => setQuantity(1)}
//         >
//           Add to Cart
//         </motion.button>
//       ) : (
//         <div className="flex items-center justify-center space-x-4 bg-gray-700 p-2 rounded-lg">
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
//             onClick={handleDecrease}
//           >
//             -
//           </motion.button>
//           <span className="text-white text-lg font-semibold">{quantity}</span>
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-all"
//             onClick={handleIncrease}
//           >
//             +
//           </motion.button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CartButton;
