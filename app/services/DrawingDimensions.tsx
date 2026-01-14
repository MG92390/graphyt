import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const X_MAX = SCREEN_WIDTH * 0.95
export const X_MIN = SCREEN_WIDTH * 0.06
export const Y_MAX = SCREEN_HEIGHT * 0.95
export const HALF_Y = (Y_MAX + SCREEN_HEIGHT * 0.301) / 2
export const SCALE = 40;
export const GRID_SIZE_Y = Math.max(Math.floor(SCREEN_HEIGHT / 58), 11);
export const GRID_SIZE_X = Math.max(Math.floor(SCREEN_WIDTH / 44), 8);