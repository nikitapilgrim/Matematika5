import {css, keyframes} from "styled-components";

const SlideTop = keyframes`
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0vh);
  }
`;

const SlideBottom = keyframes`
  0% {
    transform: translateY(0vh);
  }
  100% {
    transform: translateY(-100vh);
  }
`;

export const SlideVert = props => css`
  animation: ${props.show ? SlideTop : SlideBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;
