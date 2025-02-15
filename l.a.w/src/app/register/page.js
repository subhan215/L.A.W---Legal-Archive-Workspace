"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "../../components/ui/CustomButton";
import  Input  from "../../components/ui/input";
import Label from "../../components/ui/label";
import { Icons } from "../../components/ui/icons";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted">
        <div className="h-full flex items-center justify-center px-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Join CaseVault</h1>
            <p className="text-muted-foreground">Create an account to start managing your legal documents</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">Enter your information to create your account</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" required type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" required type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" required type="password" />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" type="button">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
