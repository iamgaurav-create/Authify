import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
