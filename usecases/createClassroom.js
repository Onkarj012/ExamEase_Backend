const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

class CreateClassroom {
  constructor(classroomRepository) {
    this.classroomRepository = classroomRepository;
  }

  async execute({ classroomName, createdBy }) {
    const joinCode = generateRandomCode();
    const classroom = {
      classroomName,
      joinCode,
      createdBy,
    };

    return await this.classroomRepository.createClassroom(classroom);
  }
}

module.exports = CreateClassroom;
