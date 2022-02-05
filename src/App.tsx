import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Boards, Header } from "./components";
import {
  clickBoard,
  deleteTime,
  initalState,
  reducer,
  timeOver,
} from "./reducer";

const App = () => {
  const [info, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    if (info.time <= 0) {
      // window.alert(`GAME OVER!\n스테이지: ${info.stage}, 점수: ${info.point}`);
      dispatch(timeOver(true));
    } else if (!info.isPlaying) {
      dispatch(timeOver(false));
    }
  }, [info]);

  const countTimer = useCallback(() => {
    dispatch(deleteTime());
  }, []);

  const onClickBoard = useCallback((isAnswer: boolean) => {
    dispatch(clickBoard(isAnswer));
  }, []);

  return (
    <div>
      <Header {...info} countTimer={countTimer} />
      <Boards onClickBoard={onClickBoard} stage={info.stage} />
    </div>
  );
};

export default React.memo(App);
