import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const storedId = localStorage.getItem("id");
  const storedPassword = localStorage.getItem("password");

  const isAuthenticated = storedId === "autofit" && storedPassword === "123";

  // If the user is authenticated, allow them to access the route, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
