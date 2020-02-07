import React, {useEffect, useState} from 'react';
import MedalOne from '../assets/svg/medal_1.svg';
import MedalTwo from '../assets/svg/medal_2.svg';
import MedalThree from '../assets/svg/medal_3.svg';
import styled from 'styled-components';
import useStoreon from "storeon/react";


const Wrapper = styled.div`
    transition: opacity 0.6s linear;
    opacity: ${props => props.show ? 1 : 0}
    /*transition-delay: ${props => props.show ? '0.1s' : '0.1s'};*/
`;

const MedalWrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: -5rem;
`;

const Medals = styled.div`
  position: relative;
  transform: rotate(-10deg) scale(0.8);
  svg {
    filter:drop-shadow(2px 3px 5px black)
  }
`;

const MedalPercent = styled.div`
  position: absolute;
  bottom: 55%;
  left: 20%;
  text-shadow: 1px 1px 1px #000;
  color: #ffffff;
  font-size: 43px;
  font-weight: 900;
`;

export const Medal = () => {
    const {dispatch, stage, medals} = useStoreon(
        'stage', 'medals'
    );
    const [data, setData] = useState(null);

    useEffect(() => {
        if (medals.hasOwnProperty(stage)) {
            setData(medals[stage])
        } else {
            setData(null)
        }

    }, [medals, stage]);

    return (
        <Wrapper show={data}>
            {data &&
            <MedalWrapper>
                <Medals>
                    {data.type === 'bronze' && <MedalOne/>}
                    {data.type === 'iron' && <MedalTwo/>}
                    {data.type === 'gold' && <MedalThree/>}
                    {/*<MedalPercent>
                        {data.percent}%
                    </MedalPercent>*/}
                </Medals>
            </MedalWrapper>}
        </Wrapper>
    );
};