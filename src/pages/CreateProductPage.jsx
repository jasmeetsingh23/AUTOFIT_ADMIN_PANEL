import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill"; // Rich text editor library
import "react-quill/dist/quill.snow.css"; // Import Quill CSS

// Add color support in Quill
import Quill from "quill";
import "quill/dist/quill.bubble.css"; // Bubble theme for better styling

const CreateProductPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Rich text content
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [specifications, setSpecifications] = useState([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://autofittools.com/api/categories/all"
      );
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSpecificationChange = (e, index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][e.target.name] = e.target.value;
    setSpecifications(updatedSpecifications);
  };

  const handleAddSpecification = () => {
    setSpecifications([
      ...specifications,
      { title: "", values: [] }, // Ensure `values` is an array
    ]);
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category) {
      setError("Title and category are required");
      return;
    }

    // Get the category name from the selected category ID
    const selectedCategory = categories.find(
      (cat) => cat.id === parseInt(category)
    );
    const categoryName = selectedCategory ? selectedCategory.title : "";

    // Ensure specifications are properly structured
    const formattedSpecifications = specifications.map((spec) => {
      return {
        title: spec.title || "",
        values: spec.values
          ? spec.values.split(",").map((value) => value.trim())
          : [], // Ensure values is an array
      };
    });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", categoryName); // Send category name instead of ID
    if (image) {
      formData.append("image", image);
    }
    formData.append("specifications", JSON.stringify(formattedSpecifications)); // Send formatted data

    try {
      await axios.post("https://autofittools.com/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully");
    } catch (err) {
      console.error(err);
      setError("Error adding product");
    }
  };

  // Add a custom toolbar to enable text color picking
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["bold", "italic", "underline"],
      ["link"],
      [
        {
          color: [
            "#000000",
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
            "#00FFFF",
            "#FFFFFF",
          ],
        },
      ], // Predefined colors for text
      [
        {
          background: [
            "#FFFFFF",
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
            "#00FFFF",
          ],
        },
      ], // Predefined colors for background
      ["blockquote"],
      ["code-block"],
    ],
  };

  return (
    <div className="min-h-screen  p-8 dark:bg-gray-800 ">
      <h1 className="text-3xl fond-heading text-center mb-6 dark:text-white">
        Create Product
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-heading dark:text-white">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full font-body dark:bg-gray-800 dark:text-white p-3 border border-gray-300 rounded-lg "
            required
          />
        </div>
        <div>
          <label className="block font-heading text-gray-700 dark:text-white">
            Content
          </label>

          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
            className="w-full h-64 font-body dark:text-white dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block font-heading text-gray-700 mt-28 dark:text-white ">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full font-body p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-heading text-gray-700 dark:text-white">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full font-heading p-3 border dark:text-white border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-heading text-gray-700 font-medium mb-2 dark:text-white">
            Specifications
          </label>
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="p-4 mb-4 border border-gray-300 rounded-lg bg-white shadow-sm relative dark:bg-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-heading text-sm font-medium text-gray-600 mb-1 dark:text-white">
                    Specification Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={spec.title}
                    onChange={(e) => handleSpecificationChange(e, index)}
                    placeholder="E.g., Dimensions, Material"
                    className="w-full font-body dark:bg-gray-800 dark:text-white p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium text-gray-600 mb-1 dark:text-white ">
                    Values (comma separated)
                  </label>
                  <textarea
                    name="values"
                    value={spec.values}
                    onChange={(e) => handleSpecificationChange(e, index)}
                    placeholder="E.g., 10x20 cm, 30x40 cm"
                    className="w-full font-body dark:bg-gray-800 dark:text-white p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Remove Button - Positioned Top Right */}
              <button
                type="button"
                onClick={() => handleRemoveSpecification(index)}
                className="absolute font-heading top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTimes className="inline" /> Remove
              </button>
            </div>
          ))}

          {/* Add Specification Button - Styled */}
          <div>
            <button
              type="button"
              onClick={handleAddSpecification}
              className="mt-4 px-6 py-2 font-heading bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              ➕ Add Specification
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full font-heading bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setContent("");
              setCategory("");
              setImage(null);
              setSpecifications([]);
              setError("");
            }}
            className="w-full font-heading bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
