import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import React from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.push("/");
  }

  return children;
}
