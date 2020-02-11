import React from 'react'
import styled from 'styled-components'

const { detect } = require('detect-browser');
const browser = detect();

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  display: inline-block;
  position: relative;
  pointer-events: none;
  user-select: none;      
  filter: ${props => {
      //if (props.answer) return false;
      //return props.background ? `drop-shadow(0px 0px 2px rgba(0,0,0,1))` : `drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.5))`
  }};
`;

const HiddenText = styled.div`
    display: inline-block;
    font-size: ${props => `${props.size}rem`};
    text-align: center;
    font-family: 'Mali', cursive;
    font-weight: bold;
    line-height: 0.9;
    letter-spacing: 0;
    -webkit-text-stroke: ${props => {
        if (browser.name === 'chrome' ) {
            return `${parseFloat(props.stroke.width) / 10 + 'em'  || '0.2em'} ${props.stroke.color}`
        }
        return `${props.stroke.width || '0.2em'} ${props.stroke.color}`
    }};
    color: ${props => props.color || 'white'};
    paint-order: stroke fill;
`;

//const getFontSize = () => parseInt(getComputedStyle(document.documentElement).fontSize);

export const TextWithBorders = React.memo(({children, color, text, size = 6, center, strokeWidth, strokeColor}) => {
    return (
        <Wrapper center={center}>
            <HiddenText size={size} color={color} stroke={{width: strokeWidth , color: strokeColor}}>{text}</HiddenText>
        </Wrapper>
    )
});