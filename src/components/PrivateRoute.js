import { useRouter } from "next/router";
import { useEffect } from "react";

function PrivateRoute({ children }) {
  const router = useRouter();

  const isAuthenticated = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  useEffect(() => {
    if (!isAuthenticated) {
      
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : <div></div>;
}

export default PrivateRoute;