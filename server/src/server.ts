import "dotenv/config";
import env from "./utils/validateEnv";
import express from "express";
import connectDB from "./config/db";
import authRoute from "./routes/authRoutes";

const app = express();
const port = env.PORT;

// Connect to the database
connectDB();

app.use(express.json());

// Use user routes
app.use("/api/users", authRoute);
app.listen(port, () => {
  console.log("Connected to backend!");
});
