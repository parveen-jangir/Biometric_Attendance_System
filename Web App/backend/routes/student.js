import express from "express";
import {
  addStudent,
  editStudent,
  getStudentDetails,
  getStudentsByBranch,
  getStudentsByYear,
} from "../controllers/studentController.js";

const router = express.Router();

// Specific route first
router.post("/add-student", addStudent);
router.post("/edit-student/:studentprofile", editStudent);

// More general routes follow
router.get("/:year", getStudentsByYear);
router.get("/:year/:branch", getStudentsByBranch);
router.get("/:year/:branch/:studentprofile", getStudentDetails);


export default router;
