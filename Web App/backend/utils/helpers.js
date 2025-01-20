import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: './backend/.env' });

// console.log("SMTP USER",process.env.SMTP_USER)
// console.log("SMTP PASS",process.env.SMTP_PASS)
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: "try.sameerdayer@gmail.com",
    // pass: "kyegqtqsaasmfzic",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


