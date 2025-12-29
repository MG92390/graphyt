import React, { useState, useEffect } from 'react';
import { Animated, View, Text, PanResponder, ScrollView } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import EraseButton from '@/components/drawing/EraseButton';
import { PointsType } from '../types/PointsType';
import { FunctionType } from '../types/FunctionType';
import ValidationButton from '@/components/drawing/ValidationButton';
import NextFunctionButton from '@/components/drawing/NextFunctionButton';
import { styles } from './styles';
import { computePointsY } from '../services/ComputePoints';
import { SCALE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../services/DrawingDimensions';

/**
 * Screen for drawing the function
 * @returns 
 */
export default function DrawingScreen() {
    const offset_x = SCREEN_WIDTH * 0.05
    const offset_y = SCREEN_HEIGHT * 0.3

    const FUNCTIONS: Array<FunctionType> = [
        { name: 'f(x) = x', formula: (x: number) => x },
        { name: 'f(x) = -x', formula: (x: number) => -x },
        { name: 'f(x) = x²', formula: (x: number) => x * x },
        { name: 'f(x) = x³', formula: (x: number) => x * x * x },
        { name: 'f(x) = exp(x)', formula: (x: number) => Math.exp(x) },
        { name: 'f(x) = 1/x', formula: (x: number) => 1 / x },
        { name: 'f(x) = log(x)', formula: (x: number) => Math.log(x) },
    ];
    const GRID_SIZE_Y = Math.max(Math.floor(SCREEN_HEIGHT / 58), 11);
    const GRID_SIZE_X = Math.max(Math.floor(SCREEN_WIDTH / 44), 8);

    const [currentFunction, setCurrentFunction] = useState(0);
    const [points, setPoints] = useState<Array<PointsType>>([]);
    const [actualPoints, setActualPoints] = useState<Array<PointsType>>([]);
    const [drawing, setDrawing] = useState(true);
    const [timeLeft, setTimeLeft] = useState(20000000); // 2 minutes in seconds
    const [resetTimer, setResetTimer] = useState(false); // 2 minutes in seconds
    const [score, setScore] = useState(0);

    //Timer
    useEffect(() => {
        if (resetTimer) {
            setResetTimer(false)
            setTimeLeft(20000000)
            setActualPoints([])
        }
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setDrawing(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resetTimer]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            //Allow to draw circles
            if (drawing) {
                const { moveX, moveY } = gestureState;
                const newPoint = { x: moveX, y: moveY };
                setPoints((prev) => [...prev, newPoint]);
                const corrected_y = computePointsY(FUNCTIONS[currentFunction], newPoint.x)
                if (!Number.isNaN(corrected_y)) {
                    actualPoints.push({
                        x: newPoint.x,
                        y: corrected_y
                    })
                }
            }
        },
    });

    //Render the grid
    const renderGrid = () => {
        const lines = [];
        // Vertical lines
        for (let x = 0; x <= GRID_SIZE_X; x++) {
            //Set the Y-axis
            if (x == Math.floor(GRID_SIZE_X / 2)) {
                lines.push(
                    <Line
                        key={`v-${x}`}
                        x1={x * SCALE}
                        y1={0}
                        x2={x * SCALE}
                        y2={GRID_SIZE_X * 70}
                        stroke="#a61c1cff"
                        strokeWidth="1"
                    />
                );
            }
            else {
                lines.push(
                    <Line
                        key={`v-${x}`}
                        x1={x * SCALE}
                        y1={0}
                        x2={x * SCALE}
                        y2={GRID_SIZE_X * 70}
                        stroke="#e0e0e0"
                        strokeWidth="1"
                    />
                );
            }

        }
        // Horizontal lines
        for (let y = 0; y <= GRID_SIZE_Y; y++) {
            //Set the X-axis
            if (y == Math.floor(GRID_SIZE_Y / 2)) {
                lines.push(
                    <Line
                        key={`h-${y}`}
                        x1={0}
                        y1={y * SCALE}
                        x2={SCREEN_WIDTH}
                        y2={y * SCALE}
                        stroke="#a61c1cff"
                        strokeWidth="1"
                    />
                );
            }
            else {
                lines.push(
                    <Line
                        key={`h-${y}`}
                        x1={0}
                        y1={y * SCALE}
                        x2={SCREEN_WIDTH}
                        y2={y * SCALE}
                        stroke="#e0e0e0"
                        strokeWidth="1"
                    />
                );
            }
        }

        return lines;
    };

    //Render the points on the grid
    const renderPoints = () => {
        return points.map((point, index) => (
            <Circle
                key={index}
                cx={point.x - offset_x}
                cy={point.y - offset_y}
                r="4"
                fill="#6366f1"
            />
        ));
    };

    //Render the correct points
    const renderActualPoints = () => {
        return actualPoints.map((point, index) => (
            <Circle
                key={index}
                cx={point.x - offset_x}
                cy={point.y - offset_y}
                r="4"
                fill="#b71e13ff"
            />
        ));
    }

    return (
        <ScrollView contentContainerStyle={[styles.container,
        { minHeight: 500 },
        ]
        }>
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <Text style={styles.functionText}>
                        {FUNCTIONS[currentFunction]?.name || ''}
                    </Text>
                    <Animated.Text style={styles.score}>
                        Score: {Math.round(score)}
                    </Animated.Text>
                    <Text style={styles.timer}>Timer : {timeLeft}s</Text>
                </View>
                <View style={styles.header_buttons}>
                    <EraseButton
                        drawing={drawing}
                        setPoints={setPoints}>
                    </EraseButton>
                    <ValidationButton
                        drawing={drawing}
                        points={points}
                        shuffledFunctions={FUNCTIONS}
                        currentFunction={currentFunction}
                        setScore={setScore}
                        setTimeLeft={setTimeLeft}
                        setDrawing={setDrawing}
                    >
                    </ValidationButton>
                    <NextFunctionButton
                        drawing={drawing}
                        score={score}
                        shuffledFunctions={FUNCTIONS}
                        currentFunction={currentFunction}
                        setCurrentFunction={setCurrentFunction}
                        setPoints={setPoints}
                        setResetTimer={setResetTimer}
                        setDrawing={setDrawing}
                    >
                    </NextFunctionButton>
                </View>
            </View>

            <Animated.View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
            }}
                {...panResponder.panHandlers}
            >
                <Svg style={
                    styles.canvas
                } >
                    {renderGrid()}
                    {renderPoints()}
                    {renderActualPoints()}
                    {timeLeft == 0 ? renderActualPoints() : null}
                </Svg>
            </Animated.View>
        </ScrollView >
    )
}
