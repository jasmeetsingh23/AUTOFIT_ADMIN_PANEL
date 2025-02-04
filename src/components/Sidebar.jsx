import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListOrdered,
  Package,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Building2,
  Store,
  Factory,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false); // Product dropdown state
  const [isExhibitionDropdownOpen, setIsExhibitionDropdownOpen] =
    useState(false); // Exhibition dropdown state
  const location = useLocation();
  const { isDark, setIsDark } = useTheme();

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { title: "Category", icon: <ListOrdered size={20} />, path: "/category" },
    {
      title: "Product",
      icon: <Package size={20} />,
      path: "#", // Placeholder, no direct link
      hasDropdown: true, // Flag to indicate it's a dropdown
    },
    {
      title: "Exhibition",
      icon: <Building2 size={20} />,
      path: "#", // Placeholder
      hasDropdown: true, // Exhibition dropdown
    },
    { title: "Dealers", icon: <Store size={20} />, path: "/dealers" },
    {
      title: "Distributors",
      icon: <Factory size={20} />,
      path: "/distributors",
    },
  ];

  // Apply theme classes to document root
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X size={24} className="dark:text-white" />
        ) : (
          <Menu size={24} className="dark:text-white" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out lg:translate-x-0 lg:w-64 ${
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
        } bg-white dark:bg-gray-700 shadow-xl`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b dark:white">
          <img
            src="https://autofit.dbzmanager.com/img/LOGO.png"
            alt="Logo"
            className="h-10"
          />
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.hasDropdown ? (
                  // Product or Exhibition Dropdown
                  <div>
                    <button
                      className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-left font-heading transition-colors duration-200 ${
                        location.pathname.includes(item.title.toLowerCase())
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() =>
                        item.title === "Product"
                          ? setIsProductDropdownOpen(!isProductDropdownOpen)
                          : setIsExhibitionDropdownOpen(
                              !isExhibitionDropdownOpen
                            )
                      }
                    >
                      <span
                        className={
                          location.pathname.includes(item.title.toLowerCase())
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="font-heading ">{item.title}</span>
                      <ChevronDown
                        size={16}
                        className={`ml-auto transition-transform ${
                          (
                            item.title === "Product"
                              ? isProductDropdownOpen
                              : isExhibitionDropdownOpen
                          )
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {(item.title === "Product"
                      ? isProductDropdownOpen
                      : isExhibitionDropdownOpen) && (
                      <ul className="space-y-2 pl-8 mt-2">
                        {item.title === "Product" ? (
                          <>
                            <li>
                              <Link
                                to="/createproduct"
                                className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-heading "
                              >
                                Create Product
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/listproduct"
                                className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-heading "
                              >
                                List Products
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link
                                to="/createexhibition"
                                className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-heading "
                              >
                                Create Exhibition
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/listexhibition"
                                className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-heading "
                              >
                                List Exhibitions
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={
                        location.pathname === item.path
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="font-heading ">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
