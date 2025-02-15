import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../models/user.model.js";
import connectDB from "../../../database/index.js";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    console.log("Name : ", name)
    console.log("email : ", email)
    console.log("password : ", password)
    

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
