import React from 'react';
import styled from "styled-components";
import HelpIcon from '../assets/svg/help.svg'
import useStoreon from "storeon/react";

const Wrapper = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    z-index: 300;
    cursor: pointer;
    background-size: cover;
    
    svg {
      width: 100%;    
      filter: drop-shadow(0 0 3px #FFF);
    }
`;

export const Help = () => {
    const {dispatch, help} = useStoreon('help');

    const handlerClick = () => {
      dispatch('help/show');
      setTimeout(() => {
          dispatch('help/hide')
      }, 200)
    };

    return (
        <Wrapper onClick={handlerClick}>
            <HelpIcon/>
        </Wrapper>
    )
};