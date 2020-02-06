import React from "react";
import styled from "styled-components";
import useStoreon from "storeon/react";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: ${props => props.hidden ? '-2' : '10'};
`;

const Modal = styled.div`
  border-radius: 3px;
  border: 3px solid red;
  background-color: white;
`;

const Span = styled.div`
  
`
const Button = styled.button`
  
`

export const Final = () => {
    const {dispatch, countCorrectAnswers, countQuestions, final} = useStoreon('countCorrectAnswers', 'countQuestions', 'final');

    const handlerPlayAgain = () => {
      dispatch('stage/final', false);
      dispatch('stage/to', 0)
    };

    return (
        <Wrapper hidden={!final}>
            { final && <Modal>
                <Span>Total Questions:  {countQuestions}</Span>
                <Span>Correct Questions:  {countCorrectAnswers}</Span>
                <Button onClick={handlerPlayAgain}>Play again</Button>
            </Modal>}
        </Wrapper>
    )
};