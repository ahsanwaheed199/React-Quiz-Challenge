import React, { useState, useMemo } from "react";
import { data } from "../questions";
import * as S from "./style";
let DisplayQuestion = 1;

const Quiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [correctAnswer] = useState([]);
  const [correct, setCorrect] = useState("");
  const [progress, setProgress] = useState("5%");
  const [answer, setAnswer] = useState("0%");
  const [len, setLen] = useState(data.length);
  const [maxScore, setMaxScore] = useState("0%");

  const currentData = useMemo(() => {
    const QuestionOne = (currentPage - 1) * DisplayQuestion;
    const lastQuestion = QuestionOne + DisplayQuestion;
    return data.slice(QuestionOne, lastQuestion);
  }, [currentPage]);

  const allOptions = () => {
    let options = currentData.map((val) => val.incorrect_answers);
    options.push(currentData.map((val) => val.correct_answer));
    let newOptions = options[0].concat(options[1]);
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }
    shuffle(newOptions);
    return newOptions;
  };

  // const progress = () => {
  //   return (currentPage / correctAnswer.length) * 100;
  // };
  const onNext = () => {
    setCurrentPage(currentPage + 1);
    let updatedprog = (currentPage / data.length) * 100;
    setProgress(`${updatedprog}%`);
    if (correct === "Sorry!") {
      setLen(len - 1);
    }

    let updatedMaxScore = Math.trunc((len / data.length) * 100);
    setMaxScore(`${updatedMaxScore}%`);
    let updatedanswer = Math.trunc((correctAnswer.length / data.length) * 100);
    let newAns = Math.trunc((updatedanswer / updatedMaxScore) * 100);
    setAnswer(`${newAns}%`);
    setCorrect("");
  };

  const onPrevious = () => {
    // let updatedprogress = Number(progress) - 5;
    // setProgress(`${updatedprogress}%`);
    setCurrentPage(currentPage - 1);
  };

  const handleOptions = (e) => {
    if (data.find((corAns) => corAns.correct_answer == e.target.value)) {
      setCorrect("Correct!");
      correctAnswer.push(e.target.value);
    } else setCorrect("Sorry!");
  };
  const result = () => {
    return (correctAnswer.length / data.length) * 100;
  };

  return (
    <S.Container>
      <S.ProgressBArBorder>
        <S.ProgressBAr width={progress} />
      </S.ProgressBArBorder>

      <S.Content>
        {currentPage < 20 ? (
          currentData.map((value, index) => {
            return (
              <>
                <S.Heading>Question {currentPage} out of 20</S.Heading>
                <p>Entertainment: Board Game</p>
                <S.Question>{decodeURIComponent(value.question)}</S.Question>
                {value.difficulty == "easy" ? (
                  <span class="fa fa-star checked"></span>
                ) : value.difficulty == "medium" ? (
                  <>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>{" "}
                  </>
                ) : (
                  <>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>{" "}
                  </>
                )}
              </>
            );
          })
        ) : (
          <>
            <h2>Your Result is {result()} %</h2>
            <h2>Correct Answer: {correctAnswer.length}</h2>{" "}
            <h2>Incorrect Answer: {data.length - correctAnswer.length}</h2>
          </>
        )}

        <S.OptionsContainer>
          {currentPage < 20 &&
            allOptions().map((val, ind) => (
              <S.Button value={val} key={ind} onClick={(e) => handleOptions(e)}>
                {decodeURIComponent(val)}
              </S.Button>
            ))}
          {console.log(correctAnswer.length)}
          {console.log(len)}
          {console.log(maxScore)}
        </S.OptionsContainer>

        {currentPage < 20 && <S.Status correct={correct}> {correct}</S.Status>}
        {currentPage < 20 && (
          <S.Pages>
            <S.Button onClick={onPrevious}>Previous</S.Button>
            <S.Button onClick={onNext}>Next</S.Button>
          </S.Pages>
        )}
      </S.Content>
      <S.Score>
        <p>Score: {`${result()}%`}</p>
        <p>Max Score: {maxScore}</p>
      </S.Score>
      <S.ProgressBArBorder>
        <S.AnswerBar width={`${result()}%`} />
        <S.AnswerBarTwo width={maxScore} />
      </S.ProgressBArBorder>
    </S.Container>
  );
};

export default Quiz;
