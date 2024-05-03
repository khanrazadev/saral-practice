import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/error-handler.js";
import connectDb from "./config/connection.js";
import creatorRoutes from "./routes/creator-routes.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;
connectDb();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/creator", creatorRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("App is running on port", PORT);
});
