class TestUseCase {
    constructor(testRepository, questionRepository, optionRepository) {
      this.testRepository = testRepository;
      this.questionRepository = questionRepository;
      this.optionRepository = optionRepository;
    }
  
    async createTest(testData) {
      const test = await this.testRepository.create(testData);
      return test;
    }
  
    async getAllTests() {
      const tests = await this.testRepository.getAll();
      return tests;
    }
  
    async addQuestionsToTest(testId, questionsData) {
      const questions = await this.questionRepository.createQuestions(testId, questionsData);
      return questions;
    }
  
    async addOptionsToQuestion(questionId, optionsData) {
      const options = await this.optionRepository.createOptions(questionId, optionsData);
      return options;
    }
  }
  
  module.exports = TestUseCase;
  