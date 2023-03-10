import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/auth?authtype=signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
