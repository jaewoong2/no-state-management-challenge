import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getColor, getRandomColor } from "../../utils";

type BoardProps = {
  stage: number;
  onClickBoard: (isAnswer: boolean) => void;
};

const Boards: React.VFC<BoardProps> = ({ stage, onClickBoard }) => {
  const [color, setColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    weight: 0,
  });

  useEffect(() => {
    setColor({
      r: getRandomColor(255),
      g: getRandomColor(255),
      b: getRandomColor(255),
      a: getRandomColor(0.7) + 0.3,
      weight: 100 - stage ** 0.7 * 6,
    });
  }, [stage]);

  const numbers = useMemo(() => {
    const col = Math.round((stage + 0.5) / 2) + 1;
    const area = Math.pow(col, 2);
    const answer = Math.floor(Math.random() * area);

    return {
      col,
      area,
      answer,
    };
  }, [stage]);

  const style = useMemo(() => {
    return {
      boardStyle: (isAnswer?: boolean) => ({
        margin: "2px",
        backgroundColor: isAnswer
          ? `${getColor(color)}`
          : `${getColor({ ...color, weight: 0 })}`,
      }),

      boardWrapperStyle: {
        gridTemplateColumns: `repeat(${numbers.col}, 1fr)`,
      },
    };
  }, [numbers.col, color]);

  return (
    <ul style={style.boardWrapperStyle} className="board-wrapper">
      {new Array(numbers.area).fill(null).map((v, i) => (
        <li
          className="board"
          onClick={() => onClickBoard(numbers.answer === i)}
          key={`${v}--${i}`}
          style={style.boardStyle(numbers.answer === i)}
        />
      ))}
    </ul>
  );
};

export default React.memo(Boards, (prev, next) => prev.stage === next.stage);
