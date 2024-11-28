import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";

dotenv.config({ path: ".env" });

// console.log('PORT:', process.env.PORT);
// console.log('IP_ADDRESS:', process.env.IP_ADDRESS);
// console.log(process.env);
const app = express();
const PORT = process.env.PORT || 3001; 

app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(bodyParser.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://${process.env.IP_ADDRESS}:${PORT}`);
});
