import Quiz from "../../../src/models/Quiz";

const createQuizMock = () => {
  return  {
    question:"クイズの問題",
    correct_answer:"正解",
    incorrect_answers:[
      "不正解1",
      "不正解2",
      "不正解3",
    ]
  }
}

describe("Quizのテスト", () => {
  it("Quizが読み込めているか",() => {
    console.log("@@@@@@@@@@@@@@@@test")
    console.log(Quiz);
    expect(typeof Quiz).toStrictEqual("function");
  });
});
describe("インスタンスメソッド",() => {
  describe("コンストラクタ",() => {
    it("プロパティの確認",() => {
      const quizData = createQuizMock();
      const quiz = new Quiz(quizData);
      expect(quiz._question).toStrictEqual(quizData.question);
      expect(quiz._correct_answer).toStrictEqual(quizData.correct_answer);
      expect(quiz._incorrect_answers).toStrictEqual(quizData.incorrect_answers);
    });
    it("getter",() => {
      const quizData = createQuizMock();
      const quiz = new Quiz(quizData);
      expect(quiz.question).toStrictEqual(quizData.question);
      expect(quiz.correct_answer).toStrictEqual(quizData.correct_answer);
      expect(quiz.incorrect_answers).toStrictEqual(undefined);
    });
    it("shffle",() => {
      const quizData = createQuizMock();
      const quiz = new Quiz(quizData);
      const shuffle1 = quiz.shuffleAnswers();
      
      const shuffle2 = quiz.shuffleAnswers();
      console.log(shuffle1);
      console.log(shuffle2);
      // expect(shuffle1).not.toStrictEqual(shuffle2);
    });
    it("judgecorrectanswer",() => {
      const quizData = createQuizMock();
      const quiz = new Quiz(quizData);
      const answer = quiz.judgeCorrectAnswer(quizData.correct_answer);
      expect(answer).toStrictEqual(true);
      quizData.incorrect_answers.forEach((incorrectAnswer) => {
        expect(quiz.judgeCorrectAnswer(incorrectAnswer)).toStrictEqual(false);
      })
    });
  });
  describe("async fetchAndCreateQuizeez", () => {
    it("１０件のQuizインスタンス", async () => {
      const quizzes = await Quiz.fetchAndCreateQuizzes();
      console.log(quizzes);
      expect(Array.isArray(quizzes)).toStrictEqual(true);
      expect(quizzes.length).toStrictEqual(10);
    });
  })
});