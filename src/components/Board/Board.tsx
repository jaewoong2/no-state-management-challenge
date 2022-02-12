import React from "react";
import { Li } from "./Board.style";
import { BoardProps } from "./Board.type";

const Board: React.VFC<BoardProps> = ({ onClick, backgroundColor }) => {
  return (
    <Li backgroundColor={backgroundColor} className="board" onClick={onClick} />
  );
};

export default React.memo(Board);
