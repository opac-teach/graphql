"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function logout() {
  localStorage.removeItem("user_id");
  localStorage.removeItem("role");
  window.location.reload();
}

function login() {
  localStorage.setItem("user_id", "827dcc1f-062e-4c09-97cc-b0743acf16df");
  localStorage.setItem("role", "ADMIN");
  window.location.reload();
}


export default function LoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const storedRole = localStorage.getItem("role") || "";
    setIsLoggedIn(!!userId);
    setRole(storedRole);
  }, []);

  function handleRoleChange(newRole: string) {
    localStorage.setItem("role", newRole);
    setRole(newRole);
    window.location.reload();
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
        <select
          value={role}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">Rôle: aucun</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <Button onClick={logout}>Logout</Button>
      </>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
    
  );
}
