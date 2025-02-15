"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "../../components/ui/CustomButton";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import { Icons } from "../../components/ui/icons";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // ✅ REQUIRED for cookies to be sent
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
  
      alert("Login successful!");
      localStorage.setItem("userId", data.userId);
      window.location.href = "/dashboard"; // Redirect after successful login
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted">
        <div className="h-full flex items-center justify-center px-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome back to L.A.W.</h1>
            <p className="text-muted-foreground">
              Access your legal documents securely and efficiently
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
           
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
