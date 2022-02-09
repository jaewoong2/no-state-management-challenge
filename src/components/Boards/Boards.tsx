import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getColor, getNumbers, getRgba } from "../../utils";
import Board from "../Board/Board";
import BoardProps from "./Boards.type";

const Boards: React.VFC<BoardProps> = ({ stage, onClickBoard }) => {
  const [color, setColor] = useState({ ...getRgba(), weight: 0 });
  const { col, answer, area } = useMemo(() => getNumbers(stage), [stage]);

  useEffect(() => {
    setColor({ ...getRgba(), weight: 100 - stage ** 0.7 * 6 });
  }, [stage]);

  const boardStyle = useCallback(
    (isAnswer: boolean): React.CSSProperties => ({
      backgroundColor: isAnswer
        ? `${getColor(color)}`
        : `${getColor({ ...color, weight: 0 })}`,
    }),
    [color]
  );

  const boardWrapperStyle = useMemo(
    (): React.CSSProperties => ({
      gridTemplateColumns: `repeat(${col}, 1fr)`,
    }),
    [col]
  );

  return (
    <ul style={boardWrapperStyle} className="board-wrapper">
      {new Array(area).fill(null).map((v, i) => (
        <Board
          key={`Board-${i}-${v}`}
          onClick={() => onClickBoard(i === answer)}
          style={boardStyle(i === answer)}
        />
      ))}
    </ul>
  );
};

export default React.memo(Boards, (prev, next) => prev.stage === next.stage);
