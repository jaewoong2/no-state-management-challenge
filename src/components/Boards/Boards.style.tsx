import styled from "@emotion/styled";

export const Ul = styled.ul<{ col: number }>`
  grid-template-columns: ${({ col }) => `repeat(${col}, 1fr)`};
`;
