import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line, Circle } from 'react-native-svg';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const FUNCTIONS = [
  { name: 'f(x) = x', formula: (x: number) => x },
  { name: 'f(x) = -x', formula: (x: number) => -x },
  { name: 'f(x) = x²', formula: (x: number) => x * x },
  { name: 'f(x) = x³', formula: (x: number) => x * x * x },
  { name: 'f(x) = exp(x)', formula: (x: number) => Math.exp(x) },
  { name: 'f(x) = 1/x', formula: (x: number) => 1 / x },
  { name: 'f(x) = ln(x)', formula: (x: number) => Math.log(x) },
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GRID_SIZE = 20;
const SCALE = 40;

export default function PracticeScreen() {
  const [shuffledFunctions, setShuffledFunctions] = useState(FUNCTIONS);
  const [currentFunction, setCurrentFunction] = useState(0);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const score = useSharedValue(0);

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
    Alert.alert('Round terminé', `Votre score : ${Math.round(score.value)}`);
    setPoints([]);
    setCurrentFunction((prev) => (prev + 1) % shuffledFunctions.length);
    setTimeLeft(120); // Réinitialise le timer
  };

  const scoreStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(score.value > 80 ? 1.2 : 1) }],
    };
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDrawing(true);
        setPoints([]); // Réinitialiser les points pour un nouveau tracé
      },
      onPanResponderMove: (_, gestureState) => {
        if (drawing) {
          const { moveX, moveY } = gestureState;
          const canvasX = moveX - SCREEN_WIDTH / 2;
          const canvasY = SCREEN_HEIGHT / 2 - moveY;

          const newPoint = { x: canvasX / SCALE, y: canvasY / SCALE };
          setPoints((prev) => [...prev, newPoint]);
        }
      },
      onPanResponderRelease: () => {
        setDrawing(false);
        calculateScore(); // Calculer le score après le tracé
      },
    })
  ).current;

  const calculateScore = () => {
    const actualPoints = points.map((p) => ({
      x: p.x,
      y: shuffledFunctions[currentFunction].formula(p.x),
    }));

    const distances = points.map((p, i) =>
      Math.abs(p.y - actualPoints[i]?.y || 0)
    );

    const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
    const newScore = Math.max(0, 100 - avgDistance * 20);
    score.value = newScore;
  };

  const renderGrid = () => {
    const lines = [];

    // Vertical lines
    for (let x = -GRID_SIZE; x <= GRID_SIZE; x++) {
      lines.push(
        <Line
          key={`v-${x}`}
          x1={x * SCALE + SCREEN_WIDTH / 2}
          y1={0}
          x2={x * SCALE + SCREEN_WIDTH / 2}
          y2={SCREEN_HEIGHT}
          stroke="#e0e0e0"
          strokeWidth="1"
        />
      );
    }

    // Horizontal lines
    for (let y = -GRID_SIZE; y <= GRID_SIZE; y++) {
      lines.push(
        <Line
          key={`h-${y}`}
          x1={0}
          y1={y * SCALE + SCREEN_HEIGHT / 2}
          x2={SCREEN_WIDTH}
          y2={y * SCALE + SCREEN_HEIGHT / 2}
          stroke="#e0e0e0"
          strokeWidth="1"
        />
      );
    }

    // X-axis
    lines.push(
      <Line
        key="x-axis"
        x1={0}
        y1={SCREEN_HEIGHT / 2}
        x2={SCREEN_WIDTH}
        y2={SCREEN_HEIGHT / 2}
        stroke="#ff0000"
        strokeWidth="2"
      />
    );

    // Y-axis
    lines.push(
      <Line
        key="y-axis"
        x1={SCREEN_WIDTH / 2}
        y1={0}
        x2={SCREEN_WIDTH / 2}
        y2={SCREEN_HEIGHT}
        stroke="#ff0000"
        strokeWidth="2"
      />
    );

    return lines;
  };

  const renderPoints = () => {
    return points.map((point, index) => (
      <Circle
        key={index}
        cx={point.x * SCALE + SCREEN_WIDTH / 2}
        cy={SCREEN_HEIGHT / 2 - point.y * SCALE}
        r="4"
        fill="#6366f1"
      />
    ));
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.functionText}>
            {shuffledFunctions[currentFunction]?.name || ''}
          </Text>
          <Animated.Text style={[styles.score, scoreStyle]}>
            Score: {Math.round(score.value)}
          </Animated.Text>
          <Text style={styles.timer}>Temps restant : {timeLeft}s</Text>
        </View>

        <View style={styles.canvas} {...panResponder.panHandlers}>
          <Svg height="100%" width="100%">
            {renderGrid()}
            {renderPoints()}
          </Svg>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  functionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 18,
    color: '#ff0000',
    marginTop: 10,
  },
  canvas: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20,
    overflow: 'hidden',
  },
});