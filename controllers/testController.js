const { check, validationResult } = require('express-validator');
const TestUseCase = require('../usecases/testUseCase');
const testUseCase = new TestUseCase(
  require('../repositories/testRepository'),
  require('../repositories/questionRepository'),
  require('../repositories/optionRepository')
);

const handleRequest = async (callback, req, res) => {
  try {
    const result = await callback(req);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTest = [
  check('testName').notEmpty().withMessage('Test name is required'),
  check('startFrom').isISO8601().withMessage('Start time should be a valid date'),
  check('deadlineTime').isISO8601().withMessage('Deadline time should be a valid date'),
  check('testTime').isInt().withMessage('Test time should be a number'),
  check('totalMarks').isInt().withMessage('Total marks should be a number'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Extract individual properties with default values
      const testData = {
        testName: req.body.testName,
        startFrom: req.body.startFrom,
        deadlineTime: req.body.deadlineTime,
        testTime: req.body.testTime,
        totalMarks: req.body.totalMarks,
        postedAt: req.body.postedAt || new Date().toISOString()
      };

      const test = await testUseCase.createTest(testData);
      res.status(201).json(test);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];


exports.getAllTests = (req, res) => {
  handleRequest(async () => {
    return await testUseCase.getAllTests();
  }, req, res);
};

exports.addQuestions = (req, res) => {
  handleRequest(async () => {
    const requestBody = req.body || {};
    const { testId, questionsData } = requestBody;

    if (!testId || !Array.isArray(questionsData)) {
      throw new Error('Invalid testId or questionsData');
    }

    return await testUseCase.addQuestionsToTest(testId, questionsData);
  }, req, res);
};

exports.addOptions = (req, res) => {
  handleRequest(async () => {
    const requestBody = req.body || {};
    const { questionId, optionsData } = requestBody;

    if (!questionId || !Array.isArray(optionsData)) {
      throw new Error('Invalid questionId or optionsData');
    }

    return await testUseCase.addOptionsToQuestion(questionId, optionsData);
  }, req, res);
};
