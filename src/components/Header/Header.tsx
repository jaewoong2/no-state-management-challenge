import React, { useEffect } from "react";
import { infoType } from "src/types";

type HeaderProps = infoType & { countTimer: () => void };

const Header: React.VFC<HeaderProps> = ({ stage, time, point, countTimer }) => {
  // In App Component, interval re-render both Header, Boards Component.
  // interval in Header Component (Not App Component), for no re-rendering Boards Component
  useEffect(() => {
    const timer = setInterval(() => {
      countTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [countTimer]);

  return (
    <header>
      스테이지: {stage}, 남은 시간: {time}, 점수: {point}
    </header>
  );
};

export default React.memo(Header);
