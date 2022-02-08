import React from "react";

const Footer: React.FC = ({ children }) => {
  return <footer>{children}</footer>;
};

export default React.memo<React.FC>(Footer, () => true);
