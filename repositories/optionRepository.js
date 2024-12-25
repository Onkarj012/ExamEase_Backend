const Option = require('../models/option');
const db = require('../db/db');

class OptionRepository {
  async createOptions(questionId, optionsData) {
    const queries = optionsData.map(optionData => {
      return db.query(
        'INSERT INTO options (question_id, option_text, image_url) VALUES ($1, $2, $3) RETURNING *',
        [questionId, optionData.optionText, optionData.imageUrl]
      );
    });

    const results = await Promise.all(queries);
    return results.map(result => new Option(...result.rows[0]));
  }
}

module.exports = new OptionRepository();
