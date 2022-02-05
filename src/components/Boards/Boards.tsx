import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getColor, getRandomColor } from "../../utils";

type BoardProps = {
  stage: number;
  onClickBoard: (isSelected: boolean) => void;
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
      weight: 100 - stage * 3,
    });
  }, [stage]);

  const number = useMemo(() => {
    const col = Math.round((stage + 0.5) / 2) + 1;
    const itemNumber = Math.pow(col, 2);
    const randomIndex = Math.floor(Math.random() * itemNumber);

    return {
      col,
      randomIndex,
      itemNumber,
    };
  }, [stage]);

  const style: { [key: string]: (isAnswer: boolean) => React.CSSProperties } =
    useMemo(() => {
      return {
        boardStyle: (isAnswer: boolean) => ({
          width: `${360 / number.col - 4}px`,
          height: `${360 / number.col - 4}px`,
          margin: "2px",
          backgroundColor: isAnswer
            ? `${getColor(color)}`
            : `${getColor({ ...color, weight: 0 })}`,
        }),
      };
    }, [number, color]);

  return (
    <div className="board-wrapper">
      {new Array(number.itemNumber).fill(null).map((v, i) => (
        <div
          onClick={() => onClickBoard(number.randomIndex === i)}
          key={v + i}
          style={style.boardStyle(number.randomIndex === i)}
        ></div>
      ))}
    </div>
  );
};

export default React.memo(Boards);
