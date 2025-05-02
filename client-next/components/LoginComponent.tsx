"use client";

import useAuth from "@/app/hook/auth.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(2, "Mot de passe requis"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(2, "Mot de passe requis"),
});

type Auth = {
  email: string;
  name?: string;
  password: string;
};

export default function LoginComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  const { isAuthenticated, login, logout, register } = useAuth();

  const form = useForm<Auth>({
    resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: Auth) => {
    if (mode === "login") {
      await login(values.email, values.password);
    } else {
      await register({
        name: values.name ?? "",
        email: values.email,
        password: values.password,
      });
    }
    form.reset();
    setIsOpen(false);
  };

  const changeMode = () => {
    form.reset();
    setMode((m) => (m === "login" ? "register" : "login"));
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <DialogHeader>
                  <DialogTitle>
                    {mode === "login" ? "Sign In" : "Create Account"}
                  </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                  {mode === "register" && (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="flex justify-between mt-6">
                  <Button variant="ghost" onClick={changeMode}>
                    {mode === "login"
                      ? "No account? Register"
                      : "Already have an account? Log in"}
                  </Button>
                  <Button
                    type="submit"
                    variant="confirm"
                    disabled={form.formState.isSubmitting}
                  >
                    {mode === "login" ? "Login" : "Register"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
