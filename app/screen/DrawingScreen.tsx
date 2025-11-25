import React, { useState, useRef, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, PanResponder, Alert, ScrollView, Pressable } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import EraseButton from '@/components/drawing/EraseButton';
import { PointsType } from '../types/PointsType';
import { FunctionType } from '../types/FunctionType';

/**
 * Screen for drawing the function
 * @returns 
 */
export default function DrawingScreen() {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    const FUNCTIONS: Array<FunctionType> = [
        { name: 'f(x) = x', formula: (x: number) => x },
        { name: 'f(x) = -x', formula: (x: number) => -x },
        { name: 'f(x) = x²', formula: (x: number) => x * x },
        { name: 'f(x) = x³', formula: (x: number) => x * x * x },
        { name: 'f(x) = exp(x)', formula: (x: number) => Math.exp(x) },
        { name: 'f(x) = 1/x', formula: (x: number) => 1 / x },
        { name: 'f(x) = ln(x)', formula: (x: number) => Math.log(x) },
    ];
    const GRID_SIZE_Y = Math.max(Math.floor(SCREEN_HEIGHT / 58), 10);
    const GRID_SIZE_X = Math.max(Math.floor(SCREEN_WIDTH / 46), 10);
    const SCALE = 40;
    const [shuffledFunctions, setShuffledFunctions] = useState(FUNCTIONS);
    const [currentFunction, setCurrentFunction] = useState(0);
    const [points, setPoints] = useState<Array<PointsType>>([]);
    const [drawing, setDrawing] = useState(true);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [score, setScore] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    endRound();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const endRound = () => {
        Alert.alert('Round terminé', `Votre score : ${Math.round(score)}`);
        setPoints([]);
        setCurrentFunction((prev) => (prev + 1) % shuffledFunctions.length);
        setTimeLeft(120); // Réinitialise le timer
    };

    const scoreStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: withSpring(score > 80 ? 1.2 : 1) }],
        };
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                //setPoints([]); Réinitialiser les points pour un nouveau tracé
            },
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (drawing) {
                    const { moveX, moveY } = gestureState;
                    const newPoint = { x: moveX, y: moveY };
                    setPoints((prev) => [...prev, newPoint]);
                }
            },
        })
    ).current;

    const calculateScore = useCallback(
        (points: Array<PointsType>,
            shuffledFunctions: Array<FunctionType>,
            currentFunction: number,
            setScore: Dispatch<SetStateAction<number>>): void => {
            const actualPoints = points.map((p) => ({
                x: p.x,
                y: shuffledFunctions[currentFunction].formula(p.x),
            }));

            const distances = points.map((p, i) =>
                Math.abs(p.y - actualPoints[i]?.y || 0)
            );

            const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
            const newScore = Math.max(0, 100 - avgDistance * 20);
            setScore(newScore);
        }, []);

    const renderGrid = () => {
        const lines = [];
        console.log("GRID_SIZE_Y: ", GRID_SIZE_Y)
        console.log("SCREEN_HEIGHT: ", Math.floor(SCREEN_HEIGHT / 58))
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
                        y2={GRID_SIZE_X * 58}
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
                        y2={GRID_SIZE_X * 58}
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

    const renderPoints = () => {
        return points.map((point, index) => (
            <Circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#6366f1"
            />
        ));
    };
    return (
        <ScrollView contentContainerStyle={[styles.container,
        { minHeight: 500 },
        ]
        }>
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <Text style={styles.functionText}>
                        {shuffledFunctions[currentFunction]?.name || ''}
                    </Text>
                    <Animated.Text style={[styles.score, scoreStyle]}>
                        Score: {Math.round(score)}
                    </Animated.Text>
                    <Text style={styles.timer}>Timer : {timeLeft}s</Text>
                </View>
                <View style={styles.header_buttons}>
                    <EraseButton
                        setPoints={setPoints}>
                    </EraseButton>
                    <Pressable
                        onPress={() => Alert.alert('Simple Button pressed')}
                        style={styles.header_button}
                    >
                        <Text style={styles.header_button_text}>
                            {'Valider'}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => Alert.alert('Simple Button pressed')}
                        style={styles.header_button}
                    >
                        <Text style={styles.header_button_text}>
                            {'Fonction suivante'}
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
            }}
                {...panResponder.panHandlers}
            >
                {<Svg style={
                    styles.canvas
                }
                    fill={"#33942aff"}>
                    {renderGrid()}
                    {renderPoints()}
                </Svg>}
            </View>
        </ScrollView >
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        flex: 1,
        backgroundColor: '#aebbd6ff',
        minHeight: '50%'
    },
    header: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        flex: 0.2,
        flexDirection: 'row',
        minHeight: "20%",
        padding: 10
    },
    header_text: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        flex: 0.33,
    },
    header_buttons: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        flex: 1,
        flexDirection: 'row',
    },
    header_button: {
        alignItems: 'center',
        backgroundColor: '#b1b9dcff',
        borderWidth: 2,
        borderRadius: 45,
        flex: 0.2,
        justifyContent: "space-evenly",
        padding: 10,
        paddingHorizontal: 20
    },
    header_button_text: {
        fontSize: 14
    },
    functionText: {
        alignItems: "center",
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    score: {
        alignItems: "center",
        fontSize: 20,
        color: '#6366f1',
        fontWeight: 'bold',
        justifyContent: "space-evenly",
    },
    timer: {
        alignItems: "center",
        fontSize: 18,
        color: '#ff0000',
        marginTop: 10,
        justifyContent: "space-evenly",
    },
    canvas: {
        flex: 0.9,
        backgroundColor: '#2b8ebbff',
        justifyContent: "space-evenly",
        width: "90%",
        minHeight: '50%'
    },
});