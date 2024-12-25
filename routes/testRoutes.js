const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.post('/create', testController.createTest);
router.get('/all', testController.getAllTests);
router.post('/:testId/questions', testController.addQuestions);
router.post('/questions/:questionId/options', testController.addOptions);

module.exports = router;
