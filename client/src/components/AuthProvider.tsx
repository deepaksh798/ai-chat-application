"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/_utils/cookies";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    const isLoginPage = pathname === "/login";

    if (token) {
      setIsAuthenticated(true);

      // Redirect authenticated users away from login or root to dashboard
      if (isLoginPage) {
        router.push("/");
      }
    } else {
      setIsAuthenticated(false);

      // Only redirect to login if the user is NOT already on the login page
      if (!isLoginPage) {
        router.push("/login");
      }
    }

    setIsLoading(false);
  }, [pathname, router]);

  // Show a loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 h-screen">
        <span className="auth-loader"></span>
        <p className="text-xl">Checking authentication</p>
      </div>
    );
  }

  // After isLoading check

  if (isAuthenticated) {
    return (
      <div className="h-screen flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className=" h-full overflow-y-scroll">{children}</div>
        </div>
      </div>
    );
  }

  // Allow unauthenticated users to access /login
  if (!isAuthenticated && pathname === "/login") {
    return <>{children}</>;
  }

  // Otherwise render nothing
  return null;
};

export default AuthProvider;
