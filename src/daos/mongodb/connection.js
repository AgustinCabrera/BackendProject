import mongoose from "mongoose";
import dotenv from "dotenv";

// export const connectionString = "mongodb://localhost:27017/ecommerce";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbUser || !dbPassword) {
  throw new Error("Please specify DB_USER and DB_PASSWORD in .env");
}

export const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.fqacb1a.mongodb.net/ecommerce?retryWrites=true&w=majority`;

try {
  await mongoose.connect(connectionString);
  console.log("Connection to MongoDB successful");
} catch (error) {
  console.log(error);
}