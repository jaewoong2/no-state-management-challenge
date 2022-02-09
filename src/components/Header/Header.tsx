import React from "react";

const Header: React.FC = ({ children }) => {
  return <header>{children}</header>;
};

export default React.memo<React.FC>(
  Header,
  (prev, next) => prev.children === next.children
);
