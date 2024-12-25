const express = require("express");
const router = express.Router();

const ClassroomController = require("../controllers/ClassroomController");

// Dependency injection
const ClassroomRepository = require("../repositories/ClassroomRepository");
const CreateClassroom = require("../usecases/createClassroom");
const JoinClassroom = require("../usecases/joinClassroom");
const AssignTestToClassroom = require("../usecases/assignTestToClassroom");

const pool = require("../db/db"); // PostgreSQL pool
const classroomRepository = new ClassroomRepository(pool);
const createClassroom = new CreateClassroom(classroomRepository);
const joinClassroom = new JoinClassroom(classroomRepository);
const assignTestToClassroom = new AssignTestToClassroom(classroomRepository);

const classroomController = new ClassroomController(
  createClassroom,
  joinClassroom,
  assignTestToClassroom
);

// Routes
router.post("/create", async (req, res) => {
  await classroomController.create(req, res);
});

router.post("/join", async (req, res) => {
  await classroomController.join(req, res);
});

router.post("/assign-test", async (req, res) => {
  await classroomController.assignTest(req, res);
});

module.exports = router;
