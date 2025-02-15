import connectDB from "../../../database/index.js";
import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,  // Prevents JS from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Set secure in production
      sameSite: "strict", // Prevents CSRF attacks
      path: "/", // Cookie is valid for the entire domain
      maxAge: 7 * 24 * 60 * 60, // 7 days expiration
    });

    console.log("✅ Token set in cookie:", token); // Debug log

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
