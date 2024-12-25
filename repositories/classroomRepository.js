const Classroom = require("../models/classroom");

class ClassroomRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findByJoinCode(joinCode) {
    const result = await this.pool.query(
      `SELECT * FROM classrooms WHERE join_code = $1`,
      [joinCode]
    );

    return result.rows.length > 0 ? new Classroom(result.rows[0]) : null;
  }

  async addUserToClassroom(userId, classroomId, role) {
    const result = await this.pool.query(
      `INSERT INTO user_classrooms (user_id, classroom_id, role) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [userId, classroomId, role]
    );

    return result.rows[0];
  }

  async assignTestToClassroom(classroomId, testId) {
    const result = await this.pool.query(
      `INSERT INTO classroom_tests (classroom_id, test_id) 
       VALUES ($1, $2) 
       RETURNING *`,
      [classroomId, testId]
    );

    return result.rows[0];
  }

  async createClassroom({ classroomName, joinCode, createdBy }) {
    const result = await this.pool.query(
      `INSERT INTO classrooms (classroom_name, join_code, created_by) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [classroomName, joinCode, createdBy]
    );

    return new Classroom(result.rows[0]);
  }
}

module.exports = ClassroomRepository;
