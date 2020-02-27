import React, {useEffect, useMemo, useRef, useState} from 'react';
import useMount from "react-use/lib/useMount";
import styled from "styled-components";
import useStoreon from 'storeon/react';
import stagesData, {LAYOUTS} from "../../data/stages";
import {sounds} from "../../sounds";
import range from "ramda/es/range";
import MedalOne from '../../assets/svg/medal_1.svg';
import MedalTwo from '../../assets/svg/medal_2.svg';
import MedalThree from '../../assets/svg/medal_3.svg';
import {TextWithBorders} from "../TextWithBorders";

const Buttons = styled.div`
    position: relative;
    margin-top: 1rem;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    font-size: 2.5rem;
    transform: scale(0.8);
`;

const Medal = styled.div`
  position: absolute;
  right: -1rem;
  bottom: -1.5rem;
  svg {
    width: 4rem;
    height: 3.5rem;
  }
`

const Wrapper = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  font-family: Boogaloo,serif;
`;

const stagesColor = {
    current: '#FFF',
    some: 'transparent',
    hover: '#FFF'
};

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 0.4em 0;
  background-color: ${props => props.current ? stagesColor.current : stagesColor.some};
  border-radius: 0.3em;
  font-size: 0.8em;
  color: ${props => props.current ? `#374F48` : `#FFF`};
  font-weight: 900;
  transition: background-color 0.3s ease;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: RGBA(255,255,255, 0.2);
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //filter: drop-shadow(0px 0px 10px white);  
`;
const Inner = styled.div`

`;

const ImgWrapper = styled.div`
  width: 100%;
  img {
   max-width: 100%;
  }
`;

export const InnerMenu = (props) => {
    const {dispatch, modal, kviz, stage, medals} = useStoreon('stage', 'kviz', 'modal', 'medals');
    const [buttons, setButtons] = useState(null);
    const ref = useRef(null);

    useMount(() => {
        const prepareButtons = stagesData.reduce((acc, stage, stageNumber) => {
            if (stage.layout === LAYOUTS.quiz) {
                const data = {...stage, id: stageNumber};
                return [...acc, data]
            }
            return acc
        }, []);
        setButtons(prepareButtons)
    });

    const setMedals = (medals, buttons) => {
        if (buttons) {
            const withRange = buttons.reduce((acc, button, i, array) => {
                if (array[i + 1]) {
                    const item = {...button, range: range(button.id + 1, array[i + 1].id)};
                    const gold = item.range.every((level) => {
                        if (medals.hasOwnProperty(level)) {
                            return true;
                        }
                    });
                    if (gold) {
                        return [...acc, {...item, type: 'gold'}]
                    }
                    return [...acc, item]
                }
                return [...acc]
            }, []);
            return withRange;
        }
    };

   const buttonsWithMedals = useMemo(() => setMedals(medals, buttons), [medals, buttons]);

    useEffect(() => {
        if (stagesData[stage] && buttonsWithMedals) {
            if (stagesData[stage].layout === LAYOUTS.quiz) {
                const nextKviz = buttonsWithMedals.findIndex((item) => {
                    return item.range.includes(stage + 1)
                });

            }
        }
    }, [stage, buttonsWithMedals]);

    const handlerStage = (next, number) => () => {
        sounds.mouseclick.play();
        const state = {
            current: -number,
            prev: kviz.prev,
        };
        dispatch('kviz/set', state);
        setTimeout(() => {
            dispatch('kviz/show');
        }, 50);
        dispatch('stage/to', next);
        dispatch('modal/hide');
    };


    return (
        <Wrapper>
            <Inner ref={ref}>
                <Title>
                    {/*
                    <ImgWrapper>
                        <img src={izaberiKviz} alt=""/>
                    </ImgWrapper>
                    */}
                    <TextWithBorders size={4} strokeWidth={"0"} strokeColor={"#896549"} color='#FFFFFF' text="Izaberi test!"/>
                </Title>
                <Buttons>
                    {
                        buttonsWithMedals && buttonsWithMedals.map((button, i) => {
                            const index = i;
                            return (
                                <Button current={kviz.order === index + 1} onClick={handlerStage(button.id, index + 1)}
                                        key={button.id}>
                                    Test {index + 1}
                                    <Medal>
                                        {button.type === 'bronze' && <MedalOne/>}
                                        {button.type === 'iron' && <MedalTwo/>}
                                        {button.type === 'gold' && <MedalThree/>}
                                    </Medal>
                                </Button>
                            )
                        })
                    }
                </Buttons>
            </Inner>
        </Wrapper>
    )
};