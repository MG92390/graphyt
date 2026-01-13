import React, { createContext, useContext, useMemo, useState } from 'react';
import { DrawingContextType } from '../types/DrawingContextType';
import { PointsType } from '../types/PointsType';
import { floorEvenNumber } from '../services/FloorEvenNumber';
import { SCALE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../services/DrawingDimensions';

/**
 * Context for the drawing when it has been generated.
 */
export const DrawingContext = createContext<DrawingContextType | null>(null);

export const useDrawing = () => {
    const contextValue = useContext(DrawingContext);
    if (contextValue === null) {
        throw new Error("DrawingContext has not been Provided!");
    }
    return contextValue;
}

/**
 * Provider for the Drawing Context. Provide the generated Drawing and the setter of the Drawing.
 * @param props 
 */
export const DrawingProvider = (props: any) => {
    //Set score
    const [score, setScore] = useState<number>(0);
    //Set time
    const [timeLeft, setTimeLeft] = useState<number>(120);
    //Set drawing
    const [drawing, setDrawing] = useState<boolean>(true);
    //Set drawing
    const [points, setPoints] = useState<Array<PointsType>>([]);
    const maxWidth = SCREEN_WIDTH * 0.9;
    const gridSizeX = floorEvenNumber(maxWidth / SCALE)
    const maxHeight = SCREEN_HEIGHT * 0.7
    const gridSizeY = floorEvenNumber(maxHeight / SCALE);
    //Set OFFSET_X
    const OFFSET_X = SCREEN_WIDTH * (SCREEN_WIDTH - gridSizeX * SCALE) / 100
    //SET OFFSET_Y
    const OFFSET_Y = SCREEN_HEIGHT * (SCREEN_HEIGHT - gridSizeY * SCALE) / 100;

    const value = {
        score: score,
        timeLeft: timeLeft,
        drawing: drawing,
        points: points,
        shuffledFunctions: [],
        currentFunction: 0,
        gridSizeX: gridSizeX,
        gridSizeY: gridSizeY,
        OFFSET_X: OFFSET_X,
        OFFSET_Y: OFFSET_Y,
    };

    const result = useMemo(() => {
        return { ...value, setScore, setTimeLeft, setDrawing, setPoints }
    }, [])

    return (
        <DrawingContext.Provider value={result}>
            {props.children}
        </DrawingContext.Provider>
    )
}