const Question = require('../models/question');
const db = require('../db/db.js');

class QuestionRepository {
  async createQuestions(testId, questionsData) {
    const queries = questionsData.map(questionData => {
      return db.query(
        'INSERT INTO questions (test_id, question_text, image_url) VALUES ($1, $2, $3) RETURNING *',
        [testId, questionData.questionText, questionData.imageUrl]
      );
    });

    const results = await Promise.all(queries);
    return results.map(result => new Question(...result.rows[0]));
  }
}

module.exports = new QuestionRepository();
