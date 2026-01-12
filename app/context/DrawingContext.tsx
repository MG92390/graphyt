import React, { createContext, useContext, useState } from 'react';
import { DrawingContextType } from '../types/DrawingContextType';
import { PointsType } from '../types/PointsType';

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
    const value = {
        score: score,
        timeLeft: timeLeft,
        drawing: drawing,
        points: points,
        shuffledFunctions: [],
        currentFunction: 0,
    };

    return (
        <DrawingContext.Provider value={{ ...value, setScore, setTimeLeft, setDrawing, setPoints }}>
            {props.children}
        </DrawingContext.Provider>
    )
}