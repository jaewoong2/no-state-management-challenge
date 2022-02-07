import React from "react";

type HeaderProps = {
  stage: number;
  time: number;
  point: number;
};

const Header: React.VFC<HeaderProps> = ({ stage, time, point }) => {
  return (
    <header>
      스테이지: {stage}, 남은 시간: {time}, 점수: {point}
    </header>
  );
};

export default React.memo(Header);
