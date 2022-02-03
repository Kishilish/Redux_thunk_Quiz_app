import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// Linkを囲うパターンで使う

const Home = () => {
  const navigate = useNavigate();
  const handleClick = ()=> {
    navigate("/quiz");
  }
  
  return(
    <div>
      <h1>Home</h1>
      <Button onClickHandler={handleClick}>
        データロード
      </Button>

      {/* <Link 
      to="/quiz"
      style={{ 
        textDecoration: 'none',
        color:"black"
      }}
      >
        <Button
        
        onClickHandler={() => {
        }}>データロード</Button>
      </Link> */}
      {/* LinkでButtonを囲うパターン */}
      
    </div>
  )
};
export default Home;