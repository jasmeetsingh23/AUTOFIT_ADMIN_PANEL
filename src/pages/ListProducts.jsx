// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

// const ListProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     category: "", // Store category name
//     specifications: [],
//     image: null,
//   });
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         "http://autofit.dbzmanager.com/api/products/all"
//       );
//       setProducts(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(
//         "http://autofit.dbzmanager.com/api/categories/all"
//       );
//       setCategories(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://autofit.dbzmanager.com/api/products/${id}`);
//         fetchProducts();
//         alert("Product deleted successfully");
//       } catch (err) {
//         console.error(err);
//         alert("Error deleting product");
//       }
//     }
//   };

//   const handleUpdate = (product) => {
//     setSelectedProduct(product);

//     let parsedSpecifications = [];
//     try {
//       if (typeof product.specifications === "string") {
//         parsedSpecifications = JSON.parse(product.specifications);
//       } else if (Array.isArray(product.specifications)) {
//         parsedSpecifications = product.specifications;
//       }
//     } catch (error) {
//       console.error("Error parsing specifications:", error);
//       parsedSpecifications = [];
//     }

//     const formattedSpecifications = parsedSpecifications.map((spec) => ({
//       title: spec.title || "",
//       values: spec.values || "",
//     }));

//     // Set category name directly
//     setFormData({
//       title: product.title || "",
//       content: product.content || "",
//       category: product.category || "", // Store category name directly
//       specifications: formattedSpecifications,
//       image: null,
//     });

//     setIsModalOpen(true);
//   };
//   const handleSpecificationChange = (e, index) => {
//     const updatedSpecifications = [...formData.specifications];
//     updatedSpecifications[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, specifications: updatedSpecifications });
//   };

//   const handleAddSpecification = () => {
//     setFormData({
//       ...formData,
//       specifications: [...formData.specifications, { title: "", values: "" }],
//     });
//   };

//   const handleRemoveSpecification = (index) => {
//     const updatedSpecifications = formData.specifications.filter(
//       (_, i) => i !== index
//     );
//     setFormData({ ...formData, specifications: updatedSpecifications });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("content", formData.content);
//     formDataToSend.append("category", formData.category); // Send category name
//     formDataToSend.append(
//       "specifications",
//       JSON.stringify(formData.specifications)
//     );
//     if (formData.image) {
//       formDataToSend.append("image", formData.image);
//     }

//     try {
//       await axios.put(
//         `http://autofit.dbzmanager.com/api/products/${selectedProduct.id}`,
//         formDataToSend
//       );
//       fetchProducts();
//       setIsModalOpen(false);
//       alert("Product updated successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Error updating product");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ align: [] }],
//       ["bold", "italic", "underline"],
//       ["link"],
//       [
//         {
//           color: [
//             "#000000",
//             "#FF0000",
//             "#00FF00",
//             "#0000FF",
//             "#FFFF00",
//             "#FF00FF",
//             "#00FFFF",
//             "#FFFFFF",
//           ],
//         },
//       ],
//       [
//         {
//           background: [
//             "#FFFFFF",
//             "#FF0000",
//             "#00FF00",
//             "#0000FF",
//             "#FFFF00",
//             "#FF00FF",
//             "#00FFFF",
//           ],
//         },
//       ],
//       ["blockquote"],
//       ["code-block"],
//     ],
//   };

//   return (
//     <div className="min-h-screen  p-8 dark:bg-gray-800">
//       <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
//         Products
//       </h1>
//       <div className="overflow-x-auto mt-8">
//         <table className="min-w-full dark:bg-gray-600 border border-gray-300 text-sm md:text-base">
//           <thead>
//             <tr className="w-full bg-gray-100 dark:bg-gray-400">
//               <th className="py-2 px-4 border dark:text-white">ID</th>
//               <th className="py-2 px-4 border dark:text-white">
//                 Product Image
//               </th>
//               <th className="py-2 px-4 border dark:text-white">Title</th>
//               <th className="py-2 px-4 border dark:text-white">Category</th>
//               <th className="py-2 px-4 border dark:text-white">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="text-center">
//                 <td className="py-2 px-4 border dark:text-white">
//                   {product.id}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   <img
//                     src={
//                       product.image_url
//                         ? `http://autofit.dbzmanager.com${product.image_url}`
//                         : "/placeholder.png"
//                     }
//                     alt={product.title}
//                     className="w-12 h-12 mx-auto object-contain"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border dark:text-white">
//                   {product.title}
//                 </td>
//                 <td className="py-2 px-4 border dark:text-white">
//                   {product.category}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   <div className="flex justify-center gap-2 flex-wrap">
//                     <button
//                       onClick={() => handleUpdate(product)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FaTrashAlt />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Update Product Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-11/12 md:w-4/5 lg:w-3/4 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-semibold mb-4">Update Product</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="title"
//                   className="block text-sm font-medium mb-2"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="content"
//                   className="block text-sm font-medium mb-2"
//                 >
//                   Content
//                 </label>
//                 <ReactQuill
//                   value={formData.content}
//                   onChange={(content) => setFormData({ ...formData, content })}
//                   theme="snow"
//                   modules={modules}
//                   className="w-full h-64"
//                 />
//               </div>

//               <div className="mb-4 mt-20">
//                 <label
//                   htmlFor="category"
//                   className="block text-sm font-medium mb-2"
//                 >
//                   Category
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.title}>
//                       {cat.title}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="image"
//                   className="block text-sm font-medium mb-2"
//                 >
//                   Image
//                 </label>
//                 <input
//                   type="file"
//                   id="image"
//                   name="image"
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="specifications"
//                   className="block text-sm font-medium mb-2"
//                 >
//                   Specifications
//                 </label>
//                 <div className="max-h-64 overflow-y-auto p-2">
//                   {formData.specifications.map((spec, index) => (
//                     <div key={index} className="flex flex-wrap gap-4 mb-4">
//                       <input
//                         type="text"
//                         name="title"
//                         value={spec.title}
//                         onChange={(e) => handleSpecificationChange(e, index)}
//                         placeholder="Specification title"
//                         className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md"
//                       />
//                       <textarea
//                         name="values"
//                         value={spec.values}
//                         onChange={(e) => handleSpecificationChange(e, index)}
//                         placeholder="Values (comma separated)"
//                         className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveSpecification(index)}
//                         className="text-red-500 flex-shrink-0"
//                       >
//                         <FaTimes />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <button
//                   type="button"
//                   onClick={handleAddSpecification}
//                   className="text-blue-500 mt-2"
//                 >
//                   ➕ Add Specification
//                 </button>
//               </div>
//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListProducts;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    specifications: [],
    image: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://autofittools.com/api/products/all"
      );
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://autofittools.com/api/products/${id}`);
        fetchProducts();
        alert("Product deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Error deleting product");
      }
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);

    let parsedSpecifications = [];
    try {
      if (typeof product.specifications === "string") {
        parsedSpecifications = JSON.parse(product.specifications);
      } else if (Array.isArray(product.specifications)) {
        parsedSpecifications = product.specifications;
      }
    } catch (error) {
      console.error("Error parsing specifications:", error);
      parsedSpecifications = [];
    }

    const formattedSpecifications = parsedSpecifications.map((spec) => ({
      title: spec.title || "",
      values: Array.isArray(spec.values)
        ? spec.values
        : spec.values
        ? spec.values.split(",").map((v) => v.trim())
        : [],
    }));

    setFormData({
      title: product.title || "",
      content: product.content || "",
      category: product.category || "",
      specifications: formattedSpecifications,
      image: null,
    });

    setIsModalOpen(true);
  };

  const handleSpecificationChange = (e, index) => {
    const updatedSpecifications = [...formData.specifications];
    if (e.target.name === "values") {
      // Split the string into an array and trim whitespace
      updatedSpecifications[index][e.target.name] = e.target.value
        .split(",")
        .map((value) => value.trim());
    } else {
      updatedSpecifications[index][e.target.name] = e.target.value;
    }
    setFormData({ ...formData, specifications: updatedSpecifications });
  };

  const handleAddSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { title: "", values: [] }],
    });
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = formData.specifications.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, specifications: updatedSpecifications });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate specifications
    const validSpecifications = formData.specifications.filter(
      (spec) => spec.title.trim() !== "" && spec.values.length > 0
    );

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("category", formData.category);
    formDataToSend.append(
      "specifications",
      JSON.stringify(validSpecifications)
    );
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await axios.put(
        `https://autofittools.com/api/products/${selectedProduct.id}`,
        formDataToSend
      );
      fetchProducts();
      setIsModalOpen(false);
      alert("Product updated successfully");
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        alert(`Error updating product: ${err.response.data}`);
      } else {
        alert("Error updating product");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  // Card view for mobile devices
  const ProductCard = ({ product }) => (
    <div className="bg-white dark:bg-gray-600 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={
            product.image_url
              ? `https://autofittools.com${product.image_url}`
              : "/placeholder.png"
          }
          alt={product.title}
          className="w-16 h-16 object-contain mr-4"
        />
        <div>
          <h3 className="font-semibold dark:text-white">{product.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {product.category}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => handleUpdate(product)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => handleDelete(product.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 dark:bg-gray-800">
      <h1 className="text-2xl md:text-3xl font-heading mb-6 text-center dark:text-white">
        Products
      </h1>

      {/* Mobile view */}
      <div className="md:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-400">
              <th className="py-2 px-4 border  font-body text-sm dark:text-white">
                ID
              </th>
              <th className="py-2 px-4 border dark:text-white">
                Product Image
              </th>
              <th className="py-2 px-4 border  font-body text-sm dark:text-white">
                Title
              </th>
              <th className="py-2 px-4 border  font-body text-sm dark:text-white">
                Category
              </th>
              <th className="py-2 px-4 border  font-body text-sm dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-600">
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="py-2  font-body text-sm px-4 border dark:text-white">
                  {product.id}
                </td>
                <td className="py-2 px-4 border">
                  <img
                    src={
                      product.image_url
                        ? `https://autofittools.com${product.image_url}`
                        : "/placeholder.png"
                    }
                    alt={product.title}
                    className="w-12 h-12 mx-auto object-contain"
                  />
                </td>
                <td className="py-2  font-body text-sm px-4 border dark:text-white">
                  {product.title}
                </td>
                <td className="py-2 px-4  font-body text-sm border dark:text-white">
                  {product.category}
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleUpdate(product)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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

      {/* Responsive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-heading  dark:text-white">
                  Update Product
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block font-heading text-sm  mb-2 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border font-body border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block font-heading text-sm font-medium mb-2 dark:text-white"
                  >
                    Content
                  </label>
                  <div className="h-64">
                    <ReactQuill
                      value={formData.content}
                      onChange={(content) =>
                        setFormData({ ...formData, content })
                      }
                      theme="snow"
                      modules={modules}
                      className="h-full "
                    />
                  </div>
                </div>

                <div className="mt-20">
                  <label
                    htmlFor="category"
                    className="block mt-16 font-heading text-sm font-medium mb-2 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full font-body p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.title}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block font-heading text-sm font-medium mb-2 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    className="w-full font-body p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-heading text-sm font-medium mb-2 dark:text-white">
                    Specifications
                  </label>
                  <div className="space-y-4">
                    {formData.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <input
                          type="text"
                          name="title"
                          value={spec.title}
                          onChange={(e) => handleSpecificationChange(e, index)}
                          placeholder="Specification title"
                          className="flex-1 p-2 font-body border border-gray-300 rounded-md"
                        />
                        <textarea
                          name="values"
                          value={
                            Array.isArray(spec.values)
                              ? spec.values.join(", ")
                              : ""
                          }
                          onChange={(e) => handleSpecificationChange(e, index)}
                          placeholder="Values (comma separated)"
                          className="flex-1 font-body p-2 border border-gray-300 rounded-md"
                          rows="2"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecification(index)}
                          className="text-red-500 self-start sm:self-center"
                        >
                          <FaTimes size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSpecification}
                    className="mt-4 font-heading text-blue-500 hover:text-blue-700 flex items-center gap-2"
                  >
                    <span>Add Specification</span>
                  </button>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 font-heading py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 font-heading bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProducts;
