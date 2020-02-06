import React from 'react';

export const useResizeGame = (width, height) => {
    const widthToHeight = 4 / 3;
    let newWidth = width;
    let newHeight = height;
    const newWidthToHeight = newWidth / newHeight;
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
    } else {
        newHeight = newWidth / widthToHeight;
    }
    return {
        height: newHeight,
        width: newWidth,
        styles: {
            marginTop: (-newHeight / 2) + 'px',
            marginLeft: (-newWidth / 2) + 'px'
        }
    }
};