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


const MinScale = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const MaxScale = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;


export const Scale = props => css`
  animation: ${props.show ? MaxScale : MinScale} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;
