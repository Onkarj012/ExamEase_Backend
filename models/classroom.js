class Classroom {
  constructor({ id, classroomName, joinCode, createdBy, createdAt }) {
    this.id = id;
    this.classroomName = classroomName;
    this.joinCode = joinCode;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }
}

module.exports = Classroom;
