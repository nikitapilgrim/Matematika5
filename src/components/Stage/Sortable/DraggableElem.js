import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 5;
    min-width: 4rem;
    min-height: 4rem;
    color: #fff;
    background-color: #f70400;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.5rem;    
    padding: 0.5rem;
    
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
