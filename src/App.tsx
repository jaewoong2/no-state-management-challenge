import React, { useCallback, useEffect, useReducer } from "react";
import { Boards, Header, Footer } from "./components";
import {
  clickCorrect,
  clickWrong,
  decreaseTime,
  initalState,
  reducer,
  timeOver,
} from "./reducer";

const App = () => {
  const [{ time, point, stage }, dispatch] = useReducer(reducer, initalState);

  // interval - for decrease "time" by 1 every second
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decreaseTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // alert timeover by checking every "time"
  useEffect(() => {
    if (time <= 0) {
      window.alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${point}`);

      dispatch(timeOver);
    }
  }, [time]);

  // click Wrong => decrease time by 3, click Correct => next stage, point
  const onClickBoard = useCallback((isAnswer: boolean) => {
    isAnswer ? dispatch(clickCorrect) : dispatch(clickWrong);
  }, []);

  return (
    <main>
      <Header>
        스테이지: {stage}, 남은 시간: {time}, 점수: {point}
      </Header>
      <Boards onClickBoard={onClickBoard} stage={stage} />
      <Footer>
        <a
          href="https://github.com/jaewoong2/no-state-management-challenge"
          target="_blank"
          rel="noreferrer"
        >
          @jaewoong2
        </a>
      </Footer>
    </main>
  );
};

export default App;
