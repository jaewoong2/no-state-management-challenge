import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
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
  const ref = useRef<() => void>(() => {});
  const [{ time, point, isPlaying, stage }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(() => {
    ref.current = () => {
      dispatch(decreaseTime);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      ref.current();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <>
      <Header time={time} stage={stage} point={point} />
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
