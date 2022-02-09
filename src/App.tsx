import React, { useCallback, useEffect, useReducer, useRef } from "react";
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
  const ref = useRef<() => void>(() => {});
  const [state, dispatch] = useReducer(reducer, initalState);
  const { time, point, stage } = state;

  useEffect(() => {
    ref.current = () => {
      dispatch(decreaseTime);
    };

    const interval = setInterval(() => {
      ref.current();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      window.alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${point}`);

      dispatch(timeOver);
    }
  }, [time]);

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
