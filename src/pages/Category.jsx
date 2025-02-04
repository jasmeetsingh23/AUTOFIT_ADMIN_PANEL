import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaPlusCircle, FaTimes } from "react-icons/fa";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://autofittools.com/api/categories"
      );
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("https://autofittools.com/api/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowModal(false);
      setTitle("");
      setImage(null);
      setError("");
      fetchCategories();
      alert("Category added successfully");
    } catch (err) {
      console.error(err);
      setError("Error adding category");
    }
  };

  // Handle delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`https://autofittools.com/api/categories/${id}`);
        fetchCategories(); // Reload the categories list
        alert("Category deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Error deleting category");
      }
    }
  };

  // Handle show update modal
  const handleUpdate = (category) => {
    setSelectedCategory(category);
    setTitle(category.title);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(
        `https://autofittools.com/api/categories/${selectedCategory.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setShowUpdateModal(false);
      setTitle("");
      setImage(null);
      setError("");
      fetchCategories();
      alert("Category updated successfully");
    } catch (err) {
      console.error(err);
      setError("Error updating category");
    }
  };

  return (
    <div className="min-h-screen  p-8 dark:bg-gray-800">
      <h1 className="text-3xl  mb-6 dark:text-white text-center font-heading">
        Categories
      </h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition duration-300 font-heading"
      >
        <FaPlusCircle /> Add Category
      </button>

      {/* Create Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl  mb-4 font-heading">Create Category</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-body">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-body">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full font-body bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setTitle(""); // Reset title
                    setImage(null); // Reset image
                    setError(""); // Reset error
                  }}
                  className="w-full font-body bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Category Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl  font-heading mb-4">Update Category</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-body">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-body">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full font-body bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setTitle(""); // Reset title
                    setImage(null); // Reset image
                    setError(""); // Reset error
                  }}
                  className="w-full font-body bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="w-full bg-gray-100 dark:bg-gray-400">
              <th className="py-2 px-4 border dark:text-white  font-body text-sm">
                ID
              </th>
              <th className="py-2 px-4 border dark:text-white  font-body text-sm">
                Category Image
              </th>
              <th className="py-2 px-4 border dark:text-white  font-body text-sm">
                Name
              </th>
              <th className="py-2 px-4 border dark:text-white  font-body text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-600">
            {categories.map((category) => (
              <tr key={category.id} className="text-center">
                <td className="py-2 px-4 border dark:text-white  font-body text-sm">
                  {category.id}
                </td>
                <td className="py-2 px-4 border">
                  <img
                    src={
                      category.image_url
                        ? `https://autofittools.com${category.image_url}`
                        : "/placeholder.png"
                    }
                    alt={category.title}
                    className="w-12 h-12 mx-auto object-contain"
                  />
                </td>
                <td className="py-2 px-4 border dark:text-white  font-body text-sm">
                  {category.title}
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleUpdate(category)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
