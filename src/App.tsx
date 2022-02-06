import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { Boards, Header } from "./components";
import Footer from "./components/Footer/Footer";
import {
  clickCorrect,
  clickWrong,
  decreaseTime,
  initalState,
  reducer,
  reset,
  timeOver,
} from "./reducer";

const App = () => {
  const [{ time, point, isPlaying, stage }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(() => {
    if (time <= 0) {
      window.alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${point}`);
      dispatch(timeOver);
    } else if (!isPlaying) {
      dispatch(reset);
    }
  }, [time]);

  const onClickBoard = useCallback((isAnswer: boolean) => {
    isAnswer ? dispatch(clickCorrect) : dispatch(clickWrong);
  }, []);

  const onDecreaseTime = useCallback(() => {
    dispatch(decreaseTime);
  }, []);

  return (
    <>
      <Header
        onDecreaseTime={onDecreaseTime}
        time={time}
        stage={stage}
        point={point}
      />
      <Boards onClickBoard={onClickBoard} stage={stage} />
      <Footer>
        <a
          href="https://github.com/jaewoong2/no-state-management-challenge"
          target="_blank"
        >
          @jaewoong2
        </a>
      </Footer>
    </>
  );
};

export default App;
