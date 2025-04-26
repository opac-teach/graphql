"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function logout() {
  localStorage.removeItem("user_id");
  window.location.reload();
}

function login() {
  localStorage.setItem("user_id", "827dcc1f-062e-4c09-97cc-b0743acf16df");
  window.location.reload();
}

export default function LoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    setIsLoggedIn(!!userId);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
  );
}
