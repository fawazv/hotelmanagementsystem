import "dotenv/config";
import env from "./utils/validateEnv";
import express from "express";
import connectDB from "./config/db";
import authRoute from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";

const app = express();
const port = env.PORT;

// Connect to the database
connectDB();

app.use(express.json());
app.use(cors());

// Use user routes
app.use("/api/auth", authRoute);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log("Connected to backend!");
});
