import React, { useState } from "react";

function DataForm({ setData, apiUrl, title }) {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("✅ Added successfully!");
        setData((prevData) => [...prevData, data]);
        setFormData({ name: "", image: null });
      } else {
        setError("❌ Failed to add.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("❌ Error adding.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md text-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add {title}</h2>
      {message && <p className="text-green-400 text-center">{message}</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder={`Enter ${title} Name`}
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-400"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-400"
          accept="image/*"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          Add {title}
        </button>
      </form>
    </div>
  );
}

export default DataForm;
