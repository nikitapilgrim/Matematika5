import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: static !important;
    z-index: 5;
    min-width: 4rem;
    color: #000;
    background-color: #fff;
    font-family: 'Boogaloo', sans-serif;
    font-size: 2rem;
    text-align: center;
    cursor: pointer;
    padding: 0.2rem 0.5em;
`;


export const DraggableElem = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id + ''} index={index}>
            {provided => (
                <Wrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {item.value || item.placeholder}
                </Wrapper>
            )}
        </Draggable>
    );
}
