import React,{useMemo} from 'react';
import useStoreon from "storeon/react";
import styled from 'styled-components';
import {Simple} from "./Simple";
import {ManyInputs} from "./ManyInputs";
import {DragAndDrop} from "./DragAndDrop";
import {Sortable} from "./Sortable/Sortable";
import {WithAdditional} from "./WithAdditional";
import {Choice} from "./Choice";
import {Table} from "./Table";
import {EditCorrect} from "./EditCorrect";
import {LAYOUTS} from "../../data/stages";
import {Graph} from "./Graph";
import {ColumnCalculations} from "./СolumnСalculations";
import {Between} from "./Between";
import {JustInput} from "./JustInput";
const nanoid = require('nanoid');



const NextButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0.5em 0;
    width: 12rem;
    max-width: 110px;
    max-height: 80px;
    vertical-align: middle;
    border: #fff 2px solid;
    background: #09A900;
    color: #fff;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    border-radius: 5px;
    margin: -10px 0 10 10px;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.87);
    text-shadow: 1px 1px 1px #000;
    cursor: pointer;
    outline: none;
    &:hover {
      background: #0bcd00;
      cursor: pointer;
      transition: .1s ease-in-out;
    }
`;

export const Stage = ({data, onNext}) => {
    const {dispatch, modal, kviz, preloader} = useStoreon('modal', 'kviz', 'preloader');
    const dataWithKey = useMemo(() => {
        return {key: nanoid(5), ...data}
    }, [data]);


    return (
        <WithAdditional data={dataWithKey}>
            {data.layout === LAYOUTS.simple &&
            <Simple solo={true} question={data.question} answer={data.answer}/>}
            {data.layout === LAYOUTS.manyInputs && <ManyInputs handler={onNext} data={data}/>}
            {data.layout === LAYOUTS.table && <Table handler={onNext} data={data}/>}
            {data.layout === LAYOUTS.graph && <Graph handler={onNext} data={data}/>}
            {data.layout === LAYOUTS.editCorrect && <EditCorrect handler={onNext} data={data}/>}
            {data.layout === LAYOUTS.dragAndDrop && <DragAndDrop data={data} handler={onNext}/>}
            {data.layout === LAYOUTS.sortable && <Sortable data={data} handler={onNext}/>}
            {data.layout === LAYOUTS.choice && <Choice data={data} handler={onNext}/>}
            {data.layout === LAYOUTS.between && <Between data={data} handler={onNext}/>}
            {data.layout === LAYOUTS.columnCalculation && <ColumnCalculations data={data} handler={onNext}/>}
            {data.layout === LAYOUTS.justInput && <JustInput data={data} handler={onNext}/>}
            {/*{data.layout !== LAYOUTS.speech && data.layout !== LAYOUTS.choice &&
            <NextButton onClick={e => e}>Dalje</NextButton>}*/}
        </WithAdditional>
    )
};