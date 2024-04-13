import { Navigate } from "react-router-dom";
import NotPermited from "./NotPermited";
import { jwtDecode } from "jwt-decode";
const RoleBaseRouter = (props) => {
  const isStaffRoute = window.location.pathname.startsWith("/staff");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const role = decoded.role;
  if (
    (isStaffRoute && role === "Staff") ||
    (!isStaffRoute && (role === "User" || role === "Staff"))
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
