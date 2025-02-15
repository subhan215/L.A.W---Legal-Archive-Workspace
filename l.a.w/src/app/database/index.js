import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("Please define the MONGO_URL environment variable in .env.local");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected
  }

  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;




// import mongoose, { Mongoose } from "mongoose";

// global.mongoose = {
//   conn: null,
//   promise: null,
// };

// export async function dbConnect() {
//   try {
//     if (global.mongoose && global.mongoose.conn) {
//       console.log("Connected from previous");
//       return global.mongoose.conn;
//     } else {
//       const conString = process.env.MONGO_URL;

//       const promise = mongoose.connect(conString, {
//         autoIndex: true,
//       });

//       global.mongoose = {
//         conn: await promise,
//         promise,
//       };

//       console.log("Newly connected");
//       return await promise;
//     }
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     throw new Error("Database connection failed");
//   }
// }

// export const disconnect = () => {
//   if (!global.mongoose.conn) {
//     return;
//   }
//   global.mongoose.conn = null;
//   mongoose.disconnect();
// };


