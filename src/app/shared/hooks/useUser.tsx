import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import router from "next/router";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  name: string;
  email: string;
  sub: string;
  exp: number;
};

export function useAuth() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    id: string;
  } | null>(null);
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      router.push("/auth");
    } else {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser({
          name: decoded.name,
          email: decoded.email,
          id: decoded.sub,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        Cookies.remove("token");
        router.push("/auth");
      }
    }
  }, [token]);
  return { user, token };
}
