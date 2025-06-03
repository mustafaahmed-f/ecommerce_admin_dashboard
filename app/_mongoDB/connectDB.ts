import mongoose from "mongoose";

// const uri = process.env.MONGODB_URI_ATLAS as string;
const uri = process.env.MONGODB_URI as string;

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB Already connected");
    return true;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default connectDB;
