import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import api from "../../api";

const a = api;
console.log(a.base_url);
const url = "http://127.0.0.1:8000/api/student/";
const API_URL = url;

function StudentComponent() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async () => {
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: "", age: "", email: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const updateStudent = async () => {
    try {
      await axios.put(`${API_URL}${editingId}/`, formData);
      setEditingId(null);
      setFormData({ name: "", age: "", email: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-md shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6 animate-pulse">Student Management</h2>

      {/* Student Form with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6 bg-gray-800 p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <motion.button
          whileHover={{ scale: 1.00 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 p-2 rounded transition-all duration-300 hover:bg-blue-600"
          onClick={editingId ? updateStudent : addStudent}
        >
          {editingId ? "Update Student" : "Add Student"}
        </motion.button>
      </motion.div>

      {/* Student List with Animated Presence */}
      <ul className="divide-y divide-gray-700">
        <AnimatePresence>
          {students.map((student) => (
            <motion.li
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center mb-3"
            >
              <div>
                <p className="text-lg font-semibold">{student.name}</p>
                <p className="text-sm text-gray-400">Age: {student.age} | Email: {student.email}</p>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-yellow-500 px-3 py-1 rounded mr-2 transition-all duration-300 hover:bg-yellow-600"
                  onClick={() => {
                    setEditingId(student.id);
                    setFormData({ name: student.name, age: student.age, email: student.email });
                  }}
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-500 px-3 py-1 rounded transition-all duration-300 hover:bg-red-600"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </motion.button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default StudentComponent;
