import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/error-handler.js";
import connectDb from "./config/connection.js";
import creatorRoutes from "./routes/creator-routes.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3010;

const app = express();
// Middleware to set CORS headers
app.use((req, res, next) => {
  // Allow all origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow specific methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Allow specific headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // Continue to the next middleware
  next();
});
const corsOptions = {
  origin: "https://saral-practice.vercel.app",
};

connectDb();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/creator", creatorRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("App is running on port", PORT);
});
