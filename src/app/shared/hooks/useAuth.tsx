import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import router from "next/router";
import { useEffect, useState } from "react";

type DecodedToken = {
  name: string;
  sub: string; // Standard JWT subject claim (user ID)
  email: string;
  rol: string;
  exp: number;
};

export function useAuth() {
  const token = Cookies.get("token");
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    rol: string;
  } | null>(null);
  useEffect(() => {
    if (token) {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/auth");
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);
        // Opcional pero recomendado: Verificar si el token ha expirado
        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove("token");
          router.push("/auth");
          return;
        }
        console.log(token, decoded);
        setUser({
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          rol: decoded.rol,
        });
      } catch (error) {
        console.error("Token inválido o expirado:", error);
        Cookies.remove("token");
        router.push("/auth");
      }
    }
  }, [token]);
  return { userId: user ? user.id : null, token, rol: user ? user.rol : null };
}
