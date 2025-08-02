import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://she-foundation.vercel.app",
      "https://she-foundation.onrender.com",
      "https://she-foundation-amarsah15s-projects.vercel.app",
      "https://she-foundation-git-main-amarsah15s-projects.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT;

// Health check path here
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is healthy" });
});

app.get("/", (req, res) => {
  res.send("Welcome to the She Foundation API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const keepAlive = () => {
  setInterval(async () => {
    try {
      const res = await axios.get(
        "https://she-foundation.onrender.com/health",
        {
          timeout: 4000,
        }
      );
      console.log("✅ Ping successful:", res.status);
    } catch (error) {
      console.warn("⚠️ Ping failed:", error);
    }
  }, 1000 * 60 * 10); // every 10 minutes
};

keepAlive();
