// import { dbConnect, disconnect } from "@/app/database/index";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const con = await dbConnect();
//   console.log("hit db connect", new Date().getSeconds());
//   return new NextResponse("connected and disconnected");

//   //   return NextResponse.json({ messsage: "Hello World" });
// }


import { NextResponse } from "next/server";
import connectDB from "../../database/index.js";
import User from "../../models/user.model.js";

export async function GET() {
  await connectDB();
  
  // Insert test user (comment out after first test)
   await User.create({ name: "John Doe", email: "john@example.com", passwordHash: "securepassword" });

  const users = await User.find();
  return NextResponse.json(users);
}
