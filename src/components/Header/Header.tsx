import React, { useEffect, useRef, useState } from "react";

type HeaderProps = {
  stage: number;
  time: number;
  point: number;
  onDecreaseTime: () => void;
};

const Header: React.VFC<HeaderProps> = ({
  stage,
  time,
  point,
  onDecreaseTime,
}) => {
  useEffect(() => {
    const timer = setInterval(() => {
      onDecreaseTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [onDecreaseTime]);

  return (
    <header>
      스테이지: {stage}, 남은 시간: {time}, 점수: {point}
    </header>
  );
};

export default React.memo(Header);
