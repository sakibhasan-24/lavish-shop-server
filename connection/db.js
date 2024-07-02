import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    // console.log(process.env.MONGO_URI);
    // console.log(`MongoDB connected :${con.connection.host}`);
  } catch (error) {
    console.log(`Error :${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
