import { FunctionType } from "../types/FunctionType";
import { HALF_Y, SCALE, X_MAX, Y_MAX } from "./DrawingDimensions";

/**
 * Compute the true value of coordinate y for any point for any function
 */
export function computePointsY(math_function: FunctionType, x: number): number {
    let y = 0
    //If x is sup to half of WIDTH, then x is positive
    if (x > X_MAX / 2) {
        const x_scaled = (x - X_MAX / 2) / SCALE
        const y_scaled = math_function.formula(x_scaled)
        y = y_scaled * SCALE
    }
    //x is inf to half of WIDTH, then x is negative
    else {
        const x_scaled = -((X_MAX / 2 - x) / SCALE)
        const y_scaled = math_function.formula(x_scaled)
        y = y_scaled * SCALE
    }
    if (Number.isNaN(y)) {
        return y
    }

    //If y is positive
    if (y > 0) {
        //Half the screen minus the value of y
        y = HALF_Y - y
    }
    else {
        //Add to half of the screen the value of y
        y = HALF_Y + Math.abs(y)
    }
    return y
}