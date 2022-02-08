import React from "react";

type BoardProps = {
  onClick: () => void;
  style: React.CSSProperties;
};

const Board: React.VFC<BoardProps> = ({ onClick, style }) => {
  return <li className="board" onClick={onClick} style={style} />;
};

export default React.memo(Board);
