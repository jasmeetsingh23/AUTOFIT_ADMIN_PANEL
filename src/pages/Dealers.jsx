import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaPlusCircle, FaTimes } from "react-icons/fa";

const DealersPage = () => {
  const [dealers, setDealers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [names, setNames] = useState([""]);
  const [numbers, setNumbers] = useState([""]);
  const [address, setAddress] = useState("");
  const [googleMapLocation, setGoogleMapLocation] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [selectedDealer, setSelectedDealer] = useState(null);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const response = await axios.get(
        "https://autofittools.com/api/dealers/data"
      );
      setDealers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove the requirement that all fields must be filled
    const dealerData = {
      email,
      companyName,
      names,
      numbers,
      address,
      googleMapLocation,
      state,
    };

    try {
      await axios.post("https://autofittools.com/api/dealers", dealerData);
      setShowModal(false);
      resetForm();
      fetchDealers();
      alert("Dealer added successfully");
    } catch (err) {
      console.error(err);
      setError("Error adding dealer");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dealer?")) {
      try {
        await axios.delete(`https://autofittools.com/api/dealers/${id}`);
        fetchDealers();
        alert("Dealer deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Error deleting dealer");
      }
    }
  };

  const handleUpdate = (dealer) => {
    setSelectedDealer(dealer);
    setEmail(dealer.email);
    setCompanyName(dealer.company_name);

    // Ensure names and numbers are properly parsed as arrays
    try {
      setNames(
        Array.isArray(dealer.names)
          ? dealer.names
          : JSON.parse(dealer.names) || []
      );
    } catch (error) {
      console.error("Invalid names JSON:", error);
      setNames([]);
    }

    try {
      setNumbers(
        Array.isArray(dealer.numbers)
          ? dealer.numbers
          : JSON.parse(dealer.numbers) || []
      );
    } catch (error) {
      console.error("Invalid numbers JSON:", error);
      setNumbers([]);
    }

    setAddress(dealer.address);
    setGoogleMapLocation(dealer.google_map_location);
    setState(dealer.state);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const dealerData = {
      email,
      companyName,
      names,
      numbers,
      address,
      googleMapLocation,
      state,
    };

    // Include empty values explicitly if fields are cleared
    Object.keys(dealerData).forEach((key) => {
      if (dealerData[key] === "") {
        dealerData[key] = ""; // Ensure that empty fields are sent explicitly
      }
    });

    // Remove any fields that have not been changed (i.e., values are the same as before)
    Object.keys(dealerData).forEach((key) => {
      if (dealerData[key] === selectedDealer[key]) {
        delete dealerData[key];
      }
    });

    if (Object.keys(dealerData).length === 0) {
      setError("No fields to update.");
      return;
    }

    try {
      await axios.put(
        `https://autofittools.com/api/dealers/${selectedDealer.id}`,
        dealerData
      );
      setShowUpdateModal(false);
      resetForm();
      fetchDealers();
      alert("Dealer updated successfully");
    } catch (err) {
      console.error(err);
      setError("Error updating dealer");
    }
  };

  const resetForm = () => {
    setEmail("");
    setCompanyName("");
    setNames([""]);
    setNumbers([""]);
    setAddress("");
    setGoogleMapLocation("");
    setState("");
    setError("");
  };

  const addNameField = () => {
    setNames([...names, ""]);
  };

  const addNumberField = () => {
    setNumbers([...numbers, ""]);
  };

  const removeNameField = (index) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
  };

  const removeNumberField = (index) => {
    const newNumbers = numbers.filter((_, i) => i !== index);
    setNumbers(newNumbers);
  };

  return (
    <div className="min-h-screen p-8 dark:bg-gray-800">
      <h1 className="text-3xl mb-6 dark:text-white text-center font-heading">
        Dealers
      </h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition duration-300 font-heading"
      >
        <FaPlusCircle /> Add Dealer
      </button>

      {/* Create Dealer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 max-h-[80vh] overflow-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl mb-4 font-heading">Create Dealer</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-body">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-body">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              {/* Names */}
              <div>
                <label className="block text-gray-700 font-body">Names</label>
                {names.map((name, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        const newNames = [...names];
                        newNames[index] = e.target.value;
                        setNames(newNames);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeNameField(index)}
                      className="text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNameField}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add Name
                </button>
              </div>

              <div>
                <label className="block text-gray-700 font-body">Numbers</label>
                {numbers.map((number, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={number}
                      onChange={(e) => {
                        const newNumbers = [...numbers];
                        newNumbers[index] = e.target.value;
                        setNumbers(newNumbers);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeNumberField(index)}
                      className="text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNumberField}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add Number
                </button>
              </div>
              <div>
                <label className="block text-gray-700 font-body">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-body">
                  Google Map Location
                </label>
                <input
                  type="text"
                  value={googleMapLocation}
                  onChange={(e) => setGoogleMapLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-body">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                    resetForm();
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

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 max-h-[80vh] overflow-auto">
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl mb-4 font-heading">Update Dealer</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-body">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-body">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              {/* Names */}
              <div>
                <label className="block text-gray-700 font-body">Names</label>
                {names.map((name, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        const newNames = [...names];
                        newNames[index] = e.target.value;
                        setNames(newNames);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeNameField(index)}
                      className="text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNameField}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add Name
                </button>
              </div>
              {/* Numbers */}
              <div>
                <label className="block text-gray-700 font-body">Numbers</label>
                {numbers.map((number, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={number}
                      onChange={(e) => {
                        const newNumbers = [...numbers];
                        newNumbers[index] = e.target.value;
                        setNumbers(newNumbers);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeNumberField(index)}
                      className="text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNumberField}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add Number
                </button>
              </div>
              <div>
                <label className="block text-gray-700 font-body">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-body">
                  Google Map Location
                </label>
                <input
                  type="text"
                  value={googleMapLocation}
                  onChange={(e) => setGoogleMapLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-body">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                    resetForm();
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
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                ID
              </th>
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                Company Name
              </th>
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                Email
              </th>
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                Names
              </th>
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                Numbers
              </th>
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                Address
              </th>
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                Google Map Location
              </th>
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                State
              </th>
              <th className="py-2 px-4 border dark:text-white font-body text-sm text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-600">
            {dealers.map((dealer) => (
              <tr key={dealer.id}>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  {dealer.id}
                </td>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  {dealer.company_name}
                </td>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  {dealer.email}
                </td>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  {dealer.names.join(", ")}
                </td>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  {dealer.numbers.join(", ")}
                </td>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  {dealer.address}
                </td>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  {dealer.google_map_location}
                </td>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  {dealer.state}
                </td>
                <td className="py-2 px-4 border dark:text-white font-body text-sm">
                  <button
                    onClick={() => handleUpdate(dealer)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(dealer.id)}
                    className="text-red-500 hover:text-red-600 ml-4"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealersPage;
