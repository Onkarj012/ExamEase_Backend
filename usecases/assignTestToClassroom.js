class AssignTestToClassroom {
  constructor(classroomRepository) {
    this.classroomRepository = classroomRepository;
  }

  async execute({ classroomId, testId }) {
    return await this.classroomRepository.assignTestToClassroom(classroomId, testId);
  }
}

module.exports = AssignTestToClassroom;
