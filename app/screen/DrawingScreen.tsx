import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, PanResponder, ScrollView } from 'react-native';
import EraseButton from '@/components/drawing/EraseButton';
import { PointsType } from '../types/PointsType';
import ValidationButton from '@/components/drawing/ValidationButton';
import NextFunctionButton from '@/components/drawing/NextFunctionButton';
import { styles } from './styles';
import { computePointsY } from '../services/ComputePoints';
import { X_MAX, X_MIN } from '../services/DrawingDimensions';
import { MATH_FUNCTIONS } from '../services/MathFunctions';
import ResetModal from '@/components/reset/ResetModal';
import Canva from '@/components/drawing/Canva';

/**
 * Screen for drawing the function
 * @returns 
 */
export default function DrawingScreen() {
    const init_timer = 300000000;

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
            setResetTimer(false)
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

    return (
        <ScrollView contentContainerStyle={[styles.container,
        { minHeight: 500 },
        ]
        }>
            <ResetModal
                resetModalVisible={resetModalVisible}
                score={score}
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
                <Canva
                    isCorrection={isCorrection}
                    points={points}
                    correctPoints={correctPoints}
                >
                </Canva>
            </Animated.View>
        </ScrollView >
    )
}
