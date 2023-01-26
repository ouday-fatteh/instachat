import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

const SignedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  if (user) {
    return <Navigate to="/chat" replace />;
  } else return children;
};

export default SignedRoute;
