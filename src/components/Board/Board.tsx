import React from "react";
import BoardProps from "./Board.type";

const Board: React.VFC<BoardProps> = ({ onClick, style }) => {
  return <li className="board" onClick={onClick} style={style} />;
};

export default React.memo(Board);
