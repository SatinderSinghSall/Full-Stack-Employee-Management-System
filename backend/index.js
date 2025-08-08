import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./db/db.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
  res.send("App server is LIVE 🚀");
});

app.use("/api/auth/", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App server is live at http://localhost:${PORT}`);
});
