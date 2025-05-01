"use client";

import useAuth from "@/app/hook/auth.hook";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function LoginComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { isAuthenticated, login, logout, register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (mode === "login") {
      await login(form.email, form.password);
    } else {
      await register(form);
      setMode("login");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Login</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {mode === "login" ? "Sign In" : "Create Account"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {mode === "register" && (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <DialogFooter className="flex flex-col gap-2 mt-4">
              <Button onClick={handleSubmit}>
                {mode === "login" ? "Login" : "Register"}
              </Button>
              <Button
                variant="ghost"
                type="button"
                onClick={() =>
                  setMode((m) => (m === "login" ? "register" : "login"))
                }
              >
                {mode === "login"
                  ? "No account? Register here"
                  : "Already have an account? Log in"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
