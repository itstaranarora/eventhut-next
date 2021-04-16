import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "utils/urls";

export const AuthContext = createContext();

let magic;
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState(null);

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
      route.push("/dashboard");
    } catch (err) {
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      route.push("/");
    } catch (err) {}
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });
      }
    } catch (err) {}
  };

  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) {}
  };

  useEffect(async () => {
    magic = new Magic(MAGIC_PUBLIC_KEY);
    await checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
