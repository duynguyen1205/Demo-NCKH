import { Navigate } from "react-router-dom";
import NotPermited from "./NotPermited";
import { jwtDecode } from "jwt-decode";
const RoleBaseRouter = (props) => {
  const isStaffRoute = window.location.pathname.startsWith("/staff");
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const isUserRoute = window.location.pathname.startsWith("/user");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const role = decoded.role;
  if (
    (isStaffRoute && role === "Staff") ||
    (isAdminRoute && role === "Admin") ||
    (isUserRoute && role === "User")
  ) {
    return <>{props.children}</>;
  } else {
    return <NotPermited />;
  }
};

const ProtectedRoute = (props) => {
  const isAuthorized = localStorage.getItem("token") === null ? false : true;
  return (
    <>
      {isAuthorized === true ? (
        <>
          <RoleBaseRouter>{props.children}</RoleBaseRouter>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
