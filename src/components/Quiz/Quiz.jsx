import React from "react";
import { Link } from "react-router-dom";
import QuizModel from "../../models/Quiz";
import Button from "../Button/Button";
import "./Quiz.css";
class Quiz extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quizzes:[],
      currentIndex:0,
      numberOfCorrects:0

    }
    this.restart = this.restart.bind(this);
  }

  componentDidMount(){
    this.restart();
  }

  async restart(){
    this.setState({
      currentIndex:0,
      numberOfCorrects:0
    })
    
    const quizzes = await QuizModel.fetchAndCreateQUizzes()

    this.setState({
      quizzes
      // quizzes:quizzesと同じ
    });


  }

  selectAnswer(quiz,answer){
    let {numberOfCorrects,currentIndex} = this.state;
    const isCorrect =quiz.judgeCorrectAnswer(answer);
    if(isCorrect){
      numberOfCorrects++
      alert("正解です");
    } else {
      alert(`不正解です。正解は " ${quiz.correct_answer} "`);
    }
    currentIndex++;
    this.setState({
      numberOfCorrects,
      currentIndex,
    });
  }

  render(){
    const {quizzes, currentIndex} = this.state;
    // クイズを読み込み中
    if(quizzes.length === 0) {
      return this.renderLoading();
    }
    if(quizzes.length !==0 && currentIndex < quizzes.length) {
      return this.renderQuiz();
    }
    if(quizzes.length > 0 && currentIndex >= quizzes.length){
      return this.renderFinish();

    }

  }

  
  renderLoading(){
    return(
      <div>
        <h1>クイズページ</h1>
        <div>
          <p>Now Loading...</p>
          <hr />
          <Link to="/">トップページ</Link>
        </div>
      </div>
    )
  }

  renderQuiz(){
    const {quizzes, currentIndex} = this.state;
    const quiz = quizzes[currentIndex];
    const answers =  quiz.shuffleAnswers().map((answer, index)=> {
      
      return(
        <li key={index}>
          <Button onClickHandler={() => {this.selectAnswer(quiz, answer)}} >
            {answer}
          </Button>
        </li>
          
      );
    })

    return(
      <div>
        <h1>クイズページ</h1>
        <div>
          <p>{quiz.question}</p>
          <ul className="QuizList">{answers}</ul>
          <hr />
          <Link to="/" >トップページ</Link>
        </div>
      </div>
    );
  }

  renderFinish(){
    const {numberOfCorrects, quizzes} = this.state;
    return (
      <div>
        <h1>クイズページ</h1>
        <div>
         <p>{`正解数は　${numberOfCorrects}/${quizzes.length} `}</p>
         <Button onClickHandler ={this.restart} >
          Restart
         </Button>
         <hr />
         <Link to="/" >トップページ</Link>
        </div>
      </div>
    )
  }

};
export default Quiz;