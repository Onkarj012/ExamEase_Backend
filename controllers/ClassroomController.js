class ClassroomController {
  constructor(createClassroom, joinClassroom, assignTestToClassroom) {
    this.createClassroom = createClassroom;
    this.joinClassroom = joinClassroom;
    this.assignTestToClassroom = assignTestToClassroom;
  }

  async create(req, res) {
    try {
      const { classroomName, createdBy } = req.body;
      const classroom = await this.createClassroom.execute({ classroomName, createdBy });
      res.status(201).json(classroom);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async join(req, res) {
    try {
      const { userId, joinCode, role } = req.body;
      const result = await this.joinClassroom.execute({ userId, joinCode, role });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async assignTest(req, res) {
    try {
      const { classroomId, testId } = req.body;
      const result = await this.assignTestToClassroom.execute({ classroomId, testId });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ClassroomController;
