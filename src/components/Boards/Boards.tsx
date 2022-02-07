import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getColor, getNumbers, getRgba } from "../../utils";
import Board from "../Board/Board";

type BoardProps = {
  stage: number;
  onClickBoard: (isAnswer: boolean) => void;
};

const Boards: React.VFC<BoardProps> = ({ stage, onClickBoard }) => {
  const [color, setColor] = useState({ ...getRgba(), weight: 0 });

  useEffect(() => {
    setColor({ ...getRgba(), weight: 100 - stage ** 0.7 * 6 });
  }, [stage]);

  const numbers = useMemo(() => getNumbers(stage), [stage]);

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
      gridTemplateColumns: `repeat(${numbers.col}, 1fr)`,
    }),
    [numbers.col]
  );

  return (
    <ul style={boardWrapperStyle} className="board-wrapper">
      {new Array(numbers.area).fill(null).map((v, i) => (
        <Board
          key={`Board-${i}-${v}`}
          onClick={() => onClickBoard(i === numbers.answer)}
          style={boardStyle(i === numbers.answer)}
        />
      ))}
    </ul>
  );
};

export default React.memo(Boards, (prev, next) => prev.stage === next.stage);
