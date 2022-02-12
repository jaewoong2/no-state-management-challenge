import React, { useEffect, useMemo, useState } from "react";
import { getColor, getNumbers, getRgba } from "../../utils";
import Board from "../Board/Board";
import { Ul } from "./Boards.style";
import BoardProps from "./Boards.type";

const Boards: React.VFC<BoardProps> = ({ stage, onClickBoard }) => {
  const [color, setColor] = useState({ ...getRgba(), weight: 0 });
  const { col, answer, area } = useMemo(() => getNumbers(stage), [stage]);

  useEffect(() => {
    setColor({ ...getRgba(), weight: 100 - stage ** 0.7 * 6 });
  }, [stage]);

  return (
    <Ul col={col} className="board-wrapper">
      {new Array(area).fill(null).map((v, i) => (
        <Board
          key={`Board-${i}-${v}`}
          onClick={() => onClickBoard(i === answer)}
          backgroundColor={
            i === answer ? getColor(color) : getColor({ ...color, weight: 0 })
          }
        />
      ))}
    </Ul>
  );
};

export default React.memo(Boards, (prev, next) => prev.stage === next.stage);
