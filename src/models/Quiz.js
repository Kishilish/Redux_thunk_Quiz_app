import _ from "lodash";
import he from "he";
import QuizFetcher from "../data_fetchers/QuizFetcher";
class QuizModel {
  constructor({question,correct_answer,incorrect_answers }){
    // console.log(question,correct_answer, incorrect_answers);

    this._question = question;
    this._correct_answer = correct_answer;
    this._incorrect_answers = [...incorrect_answers];
  }

  get question() {
    return this._question;
  }
  get correct_answer() {
    return this._correct_answer;
  }
  // 直接inccorect_answersにアクセルすることはないので作成する必要はない

  shuffleAnswers() {
    return _.shuffle([
      this._correct_answer,...this._incorrect_answers
    ]);
  }
  judgeCorrectAnswer(answer){
    return answer === this._correct_answer;
  }

  static async fetchAndCreateQizzes () {
    const quizDataList = await QuizFetcher.fetch();

    return quizDataList.results.map((result) => {
      return {
        question:he.decode(result.question), 
        correct_answer:he.decode(result.correct_answer),
        incorrect_answers:result.incorrect_answers.map((incorrectAnswer) => {
          return he.decode(incorrectAnswer)
        })

      }
    })
    .map(quizData => {
      console.log(quizData);
      return new QuizModel(quizData);
    })
  }
}

export default QuizModel;