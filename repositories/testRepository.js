const Test = require('../models/test');
const db = require('../db/db.js');

class TestRepository {
  async create(testData) {
    const { rows } = await db.query(
      'INSERT INTO tests (test_name, posted_at, start_from, deadline_time, test_time, total_marks) VALUES ($1, COALESCE($2, CURRENT_TIMESTAMP), $3, $4, $5, $6) RETURNING *',
      [
        testData.testName,
        testData.postedAt,
        testData.startFrom,
        testData.deadlineTime,
        testData.testTime,
        testData.totalMarks
      ]
    );

    // Ensure rows[0] is valid before passing it to Test constructor
    const result = rows[0];
    if (!result || typeof result !== 'object') {
      throw new Error('Invalid row returned from database.');
    }

    return new Test(result); // Pass the row directly
  }

  async getAll() {
    const { rows } = await db.query('SELECT * FROM tests');
    if (!Array.isArray(rows)) {
      throw new Error('Query did not return a valid array.');
    }

    return rows.map(row => {
      if (!row || typeof row !== 'object') {
        throw new Error('Invalid row in query result.');
      }
      return new Test(row); // Pass each row directly
    });
  }
}

module.exports = new TestRepository();
