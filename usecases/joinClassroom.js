class JoinClassroom {
  constructor(classroomRepository) {
    this.classroomRepository = classroomRepository;
  }

  async execute({ userId, joinCode, role }) {
    const classroom = await this.classroomRepository.findByJoinCode(joinCode);

    if (!classroom) {
      throw new Error("Classroom not found");
    }

    return await this.classroomRepository.addUserToClassroom(userId, classroom.id, role);
  }
}

module.exports = JoinClassroom;
