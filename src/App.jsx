// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Category from "./pages/Category";
// import Sidebar from "./components/Sidebar";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import CreateProductPage from "./pages/CreateProductPage";
// import ListProducts from "./pages/ListProducts";
// import CreateExhibition from "./pages/CreateExhibition";
// import ListExhibitions from "./pages/ListExhibitions";
// import Dealers from "./pages/Dealers";
// import Distributors from "./pages/Distributors";

// function App() {
//   return (
//     <ThemeProvider>
//       <Router>
//         <div className="flex">
//           <Sidebar />
//           <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/category" element={<Category />} />
//               <Route path="/createproduct" element={<CreateProductPage />} />
//               <Route path="/listproduct" element={<ListProducts />} />
//               <Route path="/createexhibition" element={<CreateExhibition />} />
//               <Route path="/listexhibition" element={<ListExhibitions />} />
//               <Route path="/dealers" element={<Dealers />} />
//               <Route path="/distributors" element={<Distributors />} />
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "./contexts/ThemeContext";
import CreateProductPage from "./pages/CreateProductPage";
import ListProducts from "./pages/ListProducts";
import CreateExhibition from "./pages/CreateExhibition";
import ListExhibitions from "./pages/ListExhibitions";
import Dealers from "./pages/Dealers";
import Distributors from "./pages/Distributors";
import LoginPage from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation(); // Get the current location

  return (
    <ThemeProvider>
      <div className="flex">
        {/* Render Sidebar only if the current path is not '/login' */}
        {location.pathname !== "/login" && <Sidebar />}

        <main
          className={`${
            location.pathname === "/login"
              ? "w-full h-screen"
              : "lg:ml-64 flex-1 min-h-screen"
          } transition-colors duration-200`}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/createproduct" element={<CreateProductPage />} />
              <Route path="/listproduct" element={<ListProducts />} />
              <Route path="/createexhibition" element={<CreateExhibition />} />
              <Route path="/listexhibition" element={<ListExhibitions />} />
              <Route path="/dealers" element={<Dealers />} />
              <Route path="/distributors" element={<Distributors />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
