import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

const SignedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex  justify-center items-center h-[100vh] w-full">
        <AiOutlineLoading className="animate-spin" color="black" size={45} />
      </div>
    );
  }
  if (user !== null) {
    return <Navigate to="/chat" replace />;
  } else if (user === null && !loading) {
    return children;
  } else return;
};

export default SignedRoute;
