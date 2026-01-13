import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, PanResponder, ScrollView } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import EraseButton from '@/components/drawing/EraseButton';
import { PointsType } from '../types/PointsType';
import ValidationButton from '@/components/drawing/ValidationButton';
import NextFunctionButton from '@/components/drawing/NextFunctionButton';
import { styles } from './styles';
import { computePointsY } from '../services/ComputePoints';
import { SCALE, SCREEN_HEIGHT, SCREEN_WIDTH, X_MAX, X_MIN } from '../services/DrawingDimensions';
import { MATH_FUNCTIONS } from '../services/MathFunctions';
import ResetModal from '@/components/reset/ResetModal';
import { drawPoints } from '../services/DrawPoints';

/**
 * Screen for drawing the function
 * @returns 
 */
export default function DrawingScreen() {
    const GRID_SIZE_Y = Math.max(Math.floor(SCREEN_HEIGHT / 58), 11);
    const GRID_SIZE_X = Math.max(Math.floor(SCREEN_WIDTH / 44), 8);

    const init_timer = 30;

    const [currentFunction, setCurrentFunction] = useState(0);
    const [points, setPoints] = useState<Array<PointsType>>([]);
    const [correctPoints, setCorrectPoints] = useState<Array<PointsType>>([]);
    const [drawing, setDrawing] = useState(true);
    const [timeLeft, setTimeLeft] = useState(init_timer); // 30sec
    const [timerRunning, setTimerRunning] = useState(true);
    const [resetTimer, setResetTimer] = useState(false);
    const [score, setScore] = useState(0);
    const [isCorrection, setIsCorrection] = useState(false);
    const [resetDrawing, setResetDrawing] = useState(false);
    const [resetModalVisible, setResetModalVisible] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    //Timer
    useEffect(() => {
        if (!timerRunning) return;
        intervalRef.current ??= setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setResetModalVisible(true)
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [timerRunning])

    //Reset timer
    useEffect(() => {
        if (resetTimer) {
            setTimerRunning(true)
            setTimeLeft(init_timer)
            setDrawing(true)
            setCorrectPoints([])
            setPoints([])
            setCurrentFunction(0)
            setScore(0)
            setResetModalVisible(false)
        }
    }, [resetTimer])

    //Reset drawing
    useEffect(() => {
        if (resetDrawing) {
            setPoints([])
            setCorrectPoints([])
            setIsCorrection(false)
            setDrawing(true)
            setCurrentFunction((prev) => (prev + 1) % MATH_FUNCTIONS.length);
            setResetDrawing(false)
        }
    }, [resetDrawing]);

    //Correction
    useEffect(() => {
        for (let x = X_MIN; x <= X_MAX; x += 0.1) {
            const corrected_y = computePointsY(MATH_FUNCTIONS[currentFunction], x)
            if (!Number.isNaN(corrected_y)) {
                correctPoints.push({
                    x: x,
                    y: corrected_y
                })
            }
        }
    }, [currentFunction]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            //Allow to draw circles
            if (drawing) {
                setResetDrawing(false)
                const { moveX, moveY } = gestureState;
                const newPoint = { x: moveX, y: moveY };
                setPoints((prev) => [...prev, newPoint]);
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
        return drawPoints(points, "#6366f1");
    };

    //Render the correct points
    const renderCorrectionPoints = () => {
        return drawPoints(points, "#b71e13ff");
    }

    return (
        <ScrollView contentContainerStyle={[styles.container,
        { minHeight: 500 },
        ]
        }>
            <ResetModal
                resetModalVisible={resetModalVisible}
                setResetModalVisible={setResetModalVisible}
                setResetTimer={setResetTimer}>

            </ResetModal>
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <Text style={styles.functionText}>
                        {MATH_FUNCTIONS[currentFunction]?.name || ''}
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
                        score={score}
                        currentFunction={currentFunction}
                        setScore={setScore}
                        setTimeLeft={setTimeLeft}
                        setDrawing={setDrawing}
                        setIsCorrection={setIsCorrection}
                        setTimerRunning={setTimerRunning}
                    >
                    </ValidationButton>
                    <NextFunctionButton
                        drawing={drawing}
                        score={score}
                        shuffledFunctions={MATH_FUNCTIONS}
                        currentFunction={currentFunction}
                        setCurrentFunction={setCurrentFunction}
                        setPoints={setPoints}
                        setResetDrawing={setResetDrawing}
                        setDrawing={setDrawing}
                        setTimerRunning={setTimerRunning}
                    >
                    </NextFunctionButton>
                </View>
            </View>

            <Animated.View style={styles.animated_view}
                {...panResponder.panHandlers}
            >
                <Svg style={
                    styles.canvas
                } >
                    {renderGrid()}
                    {renderPoints()}
                    {isCorrection ? renderCorrectionPoints() : <Text>Test</Text>}
                </Svg>
            </Animated.View>
        </ScrollView >
    )
}
