/**
 * Floor a number to the biggest even number inferior to the number given
 */
export function floorEvenNumber(numberToFloor: number): number {
    const numberFloored: number = Math.floor(numberToFloor)
    if (numberFloored % 2 != 0) {
        return numberFloored - 1
    }
    return numberFloored
}