import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Play, AlertCircle } from 'lucide-react';

interface LatencyTestPanelProps {
  gamepad: Gamepad | null;
}

type TestState = 'idle' | 'waiting' | 'ready' | 'measuring' | 'result';

export default function LatencyTestPanel({ gamepad }: LatencyTestPanelProps) {
  const [testState, setTestState] = useState<TestState>('idle');
  const [latencyHistory, setLatencyHistory] = useState<number[]>([]);
  const [currentLatency, setCurrentLatency] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const previousButtonStatesRef = useRef<boolean[]>([]);

  // Reset test when controller changes
  useEffect(() => {
    if (gamepad) {
      previousButtonStatesRef.current = new Array(gamepad.buttons.length).fill(false);
    }
    if (testState === 'measuring' || testState === 'ready') {
      setTestState('idle');
    }
  }, [gamepad?.index]);

  // Monitor for button press during test
  useEffect(() => {
    if (!gamepad || testState !== 'ready') return;

    const checkButtonPress = () => {
      if (!gamepad || testState !== 'ready') return;

      // Check for any button press (rising edge)
      for (let i = 0; i < gamepad.buttons.length; i++) {
        const wasPressed = previousButtonStatesRef.current[i];
        const isPressed = gamepad.buttons[i].pressed;

        if (isPressed && !wasPressed) {
          // Button just pressed!
          const latency = Date.now() - startTimeRef.current;
          setCurrentLatency(latency);
          setLatencyHistory(prev => [...prev, latency].slice(-10)); // Keep last 10
          setTestState('result');
          return;
        }

        previousButtonStatesRef.current[i] = isPressed;
      }

      animationFrameRef.current = requestAnimationFrame(checkButtonPress);
    };

    animationFrameRef.current = requestAnimationFrame(checkButtonPress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gamepad, testState]);

  const startTest = () => {
    if (!gamepad) return;

    setTestState('waiting');
    setCurrentLatency(null);

    // Random delay between 1-3 seconds
    const delay = 1000 + Math.random() * 2000;

    setTimeout(() => {
      startTimeRef.current = Date.now();
      setTestState('ready');
    }, delay);
  };

  const resetTest = () => {
    setTestState('idle');
    setCurrentLatency(null);
  };

  const stats = latencyHistory.length > 0 ? {
    average: latencyHistory.reduce((sum, val) => sum + val, 0) / latencyHistory.length,
    min: Math.min(...latencyHistory),
    max: Math.max(...latencyHistory),
  } : null;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Latency Test</h3>
      </div>

      {!gamepad ? (
        <div className="flex items-start gap-3 rounded-md bg-muted/50 p-4">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Controller required</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Connect a controller to test input latency.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Test Display */}
          <div
            className={`flex h-48 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
              testState === 'ready'
                ? 'border-success bg-success/20 shadow-glow'
                : testState === 'waiting'
                  ? 'border-warning bg-warning/10'
                  : 'border-border bg-muted/30'
            }`}
          >
            {testState === 'idle' && (
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">Ready to Test</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Press Start to begin the latency test
                </p>
              </div>
            )}

            {testState === 'waiting' && (
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">WAIT...</p>
                <p className="mt-2 text-sm text-muted-foreground">Get ready...</p>
              </div>
            )}

            {testState === 'ready' && (
              <div className="text-center">
                <p className="text-3xl font-bold text-success animate-pulse">PRESS NOW!</p>
                <p className="mt-2 text-sm text-muted-foreground">Press any button</p>
              </div>
            )}

            {testState === 'result' && currentLatency !== null && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Reaction Time</p>
                <p className="mt-2 text-4xl font-bold text-foreground">{currentLatency}ms</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            {(testState === 'idle' || testState === 'result') && (
              <Button onClick={startTest} className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                {testState === 'result' ? 'Test Again' : 'Start Test'}
              </Button>
            )}
            {testState === 'result' && (
              <Button onClick={resetTest} variant="outline">
                Reset
              </Button>
            )}
          </div>

          {/* Statistics */}
          {stats && (
            <div className="rounded-md bg-muted/50 p-4">
              <div className="mb-2 text-sm font-medium text-foreground">
                Statistics (last {latencyHistory.length} tests)
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-muted-foreground">Average</div>
                  <div className="mt-1 font-mono text-sm font-semibold text-foreground">
                    {stats.average.toFixed(0)}ms
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Best</div>
                  <div className="mt-1 font-mono text-sm font-semibold text-success">
                    {stats.min}ms
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Worst</div>
                  <div className="mt-1 font-mono text-sm font-semibold text-destructive">
                    {stats.max}ms
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
