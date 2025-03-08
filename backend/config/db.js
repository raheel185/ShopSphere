import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
      dbName: "shopsphere",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDb;
