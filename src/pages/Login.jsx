import { useState, useEffect } from "react";
import { FaUserAlt, FaLock, FaArrowRight, FaUserShield } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedPassword = localStorage.getItem("password");

    if (storedId && storedPassword) {
      // If credentials are found in localStorage, navigate to dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id === "autofit" && password === "123") {
      // Store valid credentials in localStorage
      localStorage.setItem("id", id);
      localStorage.setItem("password", password);

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } else {
      alert("Invalid ID or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://autofittools.com/img/b.jpeg" // Placeholder image, replace with your own
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="text-5xl text-[#d81324]">
              <FaUserShield /> {/* User icon */}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ID Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserAlt className="w-5 h-5" style={{ color: "#d81324" }} />
                </div>
                <input
                  type="text"
                  placeholder="Enter your ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border font-heading border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d81324] focus:border-[#d81324] bg-white/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="w-5 h-5" style={{ color: "#d81324" }} />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border font-heading border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-heading flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#d81324] hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#91c848] transition-all duration-200 transform hover:scale-[1.02]"
            >
              Login
              <FaArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>

          {/* Footer Text */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Admin access only. Contact your administrator for login issues.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
