import React, {useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import {DragDropContext} from 'react-beautiful-dnd'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import {DraggableElem} from "./Sortable/DraggableElem";
import arrayMove from 'array-move';
import reactStringReplace from 'react-string-replace';

import useStoreon from "storeon/react";

const DroppedContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  & > div {
    &:not(:first-child) {
      margin-left: 0.4rem;
    }
  }
`;

const DroppableContainer = styled.div`
  position: relative;
  margin-top: 2rem;
`

const DroppedPlaceholder = styled.div`
    position: relative;
    width: 4rem;
    height: 4rem;
    text-align: center;
    border: dashed #434f4c 3px;
    border-radius: 0.5rem;
    background: linear-gradient(rgba(247, 4, 0, .3), transparent);

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
    position: relative;
    z-index: 0;
    height: 100%;
    width: 100%;
    color: #fff;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 900;
    font-size: 2rem;
`;

const ItemsContainer = styled.div`
  display: flex;
  position: relative;
  //margin-top: 0.5rem;
  & > div {
      &:not(:first-child) {
         margin-left: 0.4rem;
        }
  }
`;


const ItemsList = React.memo(({items}) => {
    return items.map((item, index) => (
        <DraggableElem item={item} index={index} key={item.id}/>
    ));
});


const Question = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 700;
    font-size: 3rem;
    text-shadow: 1px 1px 1px #000;
    color: white;
    & > div {
      margin: 0 1rem;
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


const parseQuestion = (question) => {
    const type = question.match(/{{([^}]+)}}/g);
    return type.reduce( (acc, item, i) => {
        return {...acc, [i + 1]: item.match(/\(([^()]+)\)/)[1]}
    }, {});
    //return type[1].match(/\(([^()]+)\)/)[1]
};

export const DragAndDrop = React.memo(({data, handler}) => {
    const [items, setItems] = useState(data.items);
    const [resultItems, setResultItems] = useState({});
    const [question, setQuestion] = useState(data.question);
    const parsedAnswer = useMemo(() => parseQuestion(data.question), [data.question]);
    const {dispatch, help} = useStoreon('help');

    useEffect(() => {
        setItems(data.items);
        setQuestion(data.question);
        setResultItems({})
    }, [data]);

    useEffect(() => {
        if (Object.values(resultItems).length === Object.values(parsedAnswer).length) {
            const right = Object.entries(resultItems).every((pair, i) => {
                const [key, obj] = pair;
                const id = i + 1;
                const value = obj.placeholder;
                console.log(id, value, parsedAnswer, parsedAnswer[id] === value, parsedAnswer[id])
                return parsedAnswer[id] === value;
            });
            if (right) handler(true)
        }
    }, [resultItems]);


    const onDragEnd = (result) => {
        console.log(result)

        if (!result.destination) {
            return;
        }

        // from items to items
        if (result.source.droppableId === 'items' && result.destination.droppableId === 'items') {
            setItems(arrayMove(items, result.source.index, result.destination.index))
            return false;
        }
        // from items to result
        if (result.source.droppableId === 'items' && result.destination.droppableId !== 'items') {
            const deletedElem = resultItems.hasOwnProperty(result.destination.droppableId) && resultItems[result.destination.droppableId];
            const newItems = [...items.filter(item => items[result.source.index] !== item)];
            setResultItems({
                ...resultItems, [result.destination.droppableId]: items[result.source.index]
            });
            setItems(deletedElem ? [...newItems, deletedElem] : newItems);
            return false;
        }
        if (result.source.droppable !== 'items') {
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
            <DroppedContainer>
                <Question>
                    {reactStringReplace(question, /{{([^}]+)}}/g, (match, i) => {
                        return (
                            <Droppable key={i} droppableId={'result'+i}>
                                {provided => (
                                    <DroppedPlaceholder ref={provided.innerRef} {...provided.droppableProps}>
                                        {provided.placeholder}
                                        {help && <HiddenWrapper help={help}>
                                            <DraggableElem item={{id: 'help'+i, value: parsedAnswer}} index={i}
                                                           key={'help'+i}/>
                                        </HiddenWrapper>}
                                        <PlaceholderInner>?</PlaceholderInner>
                                        {resultItems['result' + i] &&
                                        <DraggableElem item={resultItems['result' + i]} index={i}
                                                       key={resultItems['result' + i].id}/>
                                        }
                                    </DroppedPlaceholder>
                                )
                                }
                            </Droppable>
                        )
                    })}
                </Question>
            </DroppedContainer>
            <DroppableContainer>
                <Droppable direction="horizontal" droppableId="items">
                    {provided => (
                        <ItemsContainer ref={provided.innerRef} {...provided.droppableProps}>
                            <ItemsList items={items}/>
                            {provided.placeholder}
                        </ItemsContainer>
                    )}
                </Droppable>
            </DroppableContainer>
        </DragDropContext>
    )
});

