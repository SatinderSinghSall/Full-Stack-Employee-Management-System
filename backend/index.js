import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./db/db.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";

//! To run the backend for DEVELOPMENT -> npm run dev
//! To run the backend for PRODUCTION -> npm start

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL || "http://localhost:5173",
        "http://localhost:5173",
        "https://employee-ms-sall.vercel.app",
      ];

      if (origin && origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

connectDatabase();

app.get("/", (req, res) => {
  res.send("App server is LIVE 🚀");
});

app.use("/api/auth/", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `App server is live at http://localhost:${PORT} or https://employeems-backendcodebase.onrender.com`,
  );
});
