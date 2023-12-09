import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import Layout from "../Layout";
import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, loading } = useContext(AuthContext) as AuthContextType;

  if (loading) {
    return (
      // loading indicator
      <div className="flex h-screen w-screen items-center justify-center gap-2">
        <div
          className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-pink-600"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <h2 className="text-2xl font-medium text-rose-600">Loading...</h2>
      </div>
    );
  }

  return user ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
