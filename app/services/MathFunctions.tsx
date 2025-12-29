import { FunctionType } from "../types/FunctionType";

export const MATH_FUNCTIONS: Array<FunctionType> = [
    { name: 'f(x) = x', formula: (x: number) => x },
    { name: 'f(x) = -x', formula: (x: number) => -x },
    { name: 'f(x) = x²', formula: (x: number) => x * x },
    { name: 'f(x) = x³', formula: (x: number) => x * x * x },
    { name: 'f(x) = exp(x)', formula: (x: number) => Math.exp(x) },
    { name: 'f(x) = 1/x', formula: (x: number) => 1 / x },
    { name: 'f(x) = log(x)', formula: (x: number) => Math.log(x) },
];