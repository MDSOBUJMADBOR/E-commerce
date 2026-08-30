import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

console.log("MONGODB_URI:", process.env.MONGODB_URI ? "FOUND ✅" : "NOT FOUND ❌");

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();

    console.log("MongoDB connected successfully ✅");

    return client.db(process.env.DB_NAME || "ecommerceDB");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

export default connectDB;