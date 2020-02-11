import React, {useEffect, useMemo, useState, useRef} from 'react';
import styled, {css} from 'styled-components';
import arrayMove from 'array-move';
import useStoreon from "storeon/react";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ItemsContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;

const Elem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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


const SortableItem = SortableElement(({value}) => <Elem>{value}</Elem>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ItemsContainer>
            {items.map((item, index) => (
                <SortableItem key={`item-${item.id}`} index={index} value={item.value}/>
            ))}
        </ItemsContainer>
    );
});

function defaultGetHelperDimensions({node}) {
    return {
        height: node.offsetHeight,
        width: node.offsetWidth,
    };
}

export const Sortable = ({data, handler}) => {
    const [items, setItems] = useState(data.items);
    const [resultItems, setResultItems] = useState({});
    const {dispatch, help} = useStoreon('help');
    const ref = useRef(null);

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


    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems((items) => (
            arrayMove(items, oldIndex, newIndex)
        ));
    };

    return (
        <Wrapper ref={ref}>
            <SortableList getHelperDimensions={defaultGetHelperDimensions} useWindowAsScrollContainer={true}
                          helperClass={'.helper-class'} helperContainer={document.body} axis={'xy'}
                          items={items} onSortEnd={onSortEnd}/>
        </Wrapper>
    )
};
