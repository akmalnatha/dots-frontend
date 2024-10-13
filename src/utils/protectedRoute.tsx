import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toastError } from "../components/toast";
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); 
  }, [auth]);

  if (loading) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
