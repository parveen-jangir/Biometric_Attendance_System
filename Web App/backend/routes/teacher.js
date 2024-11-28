import express from "express";
import {
  addTeacher,
  editTeacher,
  getDistinctBranches,
  getDistinctSubjects,
  getTeacherProfile,
  getTeachersFilter,
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/get-teachers", getTeachersFilter);
router.get("/distinct-branches", getDistinctBranches);
router.get("/distinct-subjects", getDistinctSubjects);
router.get("/:teacherprofile", getTeacherProfile);
router.post("/add-teacher", addTeacher);
router.post("/edit-teacher/:teacherprofile", editTeacher);
export default router;
