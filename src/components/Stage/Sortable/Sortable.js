import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {DraggableElem} from "./DraggableElem";
import arrayMove from 'array-move';
import useStoreon from "storeon/react";

const DroppedContainer = styled.div`
  display: flex;
  position: relative;
  & > div {
    &:not(:first-child) {
      margin-left: 0.4rem;
    }
  }
`;

const DroppedPlaceholder = styled.div`
    position: relative;
    width: 4rem;
    height: 4rem;
    text-align: center;
    border: dashed #fff 3px;

    & > div {
      &:nth-child(1) {
        position: absolute;
        left: 0;
        right: 0;
        top: -0.2rem;
        }
      &:nth-child(2) {
        top: -0.22rem;
        left: -0.19rem;
        transform: scale(1.03);
      }
    }
`;
const PlaceholderInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
   
    z-index: 0;
    height: 100%;
    width: 100%;
    color: #fff;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 900;
    font-size: 2rem;
`;

const ItemsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  & > div {
      &:not(:first-child) {
          margin-left: 0.4rem;
        }
  }
`;


const HiddenWrapper = styled.div`
    position: absolute;
    z-index: 3;
    opacity: ${props => props.help ? 0.8 : 0};
    transition: 0.2s;
    div {
       
        left: -0.1rem;
        right: 0;
        top: 0;
    }
`;


const ItemsList = React.memo(({items}) => {
    return items.map((item, index) => (
        <DraggableElem item={item} index={index} key={item.id}/>
    ));
});

export const Sortable = ({data, handler}) => {
    const [items, setItems] = useState(data.items);
    const [resultItems, setResultItems] = useState({});
    const {dispatch, help} = useStoreon('help');

    const result = useMemo(() => {
        const items = data.items;
        const answer = data.answer;
        return Object.entries(answer).reduce((acc, pair) => {
            const [key, value] = pair;
            return [...acc, Object.values(items).find(item => item.id === value.id).value]
        }, []);
    }, [data]);


    useEffect(() => {
        const right = JSON.stringify(items.map(item => item.value)) === JSON.stringify(result);
        if (right) dispatch('stage/next')
    }, [items]);

    useEffect(() => {
        setItems(data.items);
        setResultItems({})
    }, [data]);

    const onDragEnd = (result) => {

        if (!result.destination) {
            return;
        }
        console.log(result, 'result')

        // from items to items
        if (result.source.droppableId === 'items' && result.destination.droppableId === 'items') {
            setItems(arrayMove(items, result.source.index, result.destination.index));
            return false;
        }
        // from items to result
        if (result.source.droppableId === 'items' && result.destination.droppableId !== 'items') {
            if (!resultItems[result.destination.droppableId]) {
                setResultItems({
                    ...resultItems, [result.destination.droppableId]: items[result.source.index]
                });
                setItems(items.filter(item => items[result.source.index] !== item))
            } else {
                const second = result.destination.droppableId;
                const copy = {...resultItems};
                const deletedElem = copy[second];
                delete copy[second];
                copy[second] = items[result.source.index];
                setResultItems(copy);
                setItems([...items, deletedElem].filter(item => item !== items[result.source.index]))
            }
            return false;
        }

        if (result.source.droppableId !== items && result.destination.droppableId !== 'items') {
            // if no swap
            if (!resultItems[result.destination.droppableId]) {
                const deletedProp = result.source.droppableId;
                const copy = {...resultItems};
                delete copy[deletedProp];
                setResultItems({...copy, [result.destination.droppableId]: resultItems[deletedProp]})
                return false;
            } else {
                // if swap
                const first = result.source.droppableId;
                const second = result.destination.droppableId;
                const copy = {...resultItems};
                copy[first] = resultItems[second];
                copy[second] = resultItems[first];
                setResultItems(copy)
            }
        }
    };


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable direction="vertical" droppableId="items">
                {provided => (
                    <ItemsContainer ref={provided.innerRef} {...provided.droppableProps}>
                        <ItemsList items={items}/>
                        {provided.placeholder}
                    </ItemsContainer>
                )}
            </Droppable>
        </DragDropContext>
    )
};