import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Database Connected Successful.");
  } catch (error) {
    console.log("Error while connecting to database.");
    console.error(error);
  }
};

export default connectDatabase;
