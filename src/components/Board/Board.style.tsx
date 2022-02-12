import styled from "@emotion/styled";
import { BoardProps } from "./Board.type";

export const Li = styled.li<BoardProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;
`;
