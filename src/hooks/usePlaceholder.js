import React, {useMemo} from 'react'

const parseCell = (cellData) => {
    const stringData = cellData.toString();
    const placeholder = stringData.includes('!');
    const data = stringData.replace('!', '')

    return {
        placeholder,
        text: data
    }
};

export const usePlaceholder = (data) => {
    return useMemo(() => parseCell(data), [data]);
};