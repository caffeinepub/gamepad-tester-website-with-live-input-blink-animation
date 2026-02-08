import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Play, Square, RotateCcw } from 'lucide-react';

interface DriftTestPanelProps {
  gamepad: Gamepad | null;
}

interface DriftData {
  time: number;
  [key: string]: number;
}

const MAX_SAMPLES = 300; // 5 seconds at 60fps
const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899'];

export default function DriftTestPanel({ gamepad }: DriftTestPanelProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [driftData, setDriftData] = useState<DriftData[]>([]);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isCapturing || !gamepad) return;

    const capture = () => {
      if (!gamepad) return;

      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      const dataPoint: DriftData = { time: currentTime };

      gamepad.axes.forEach((value, index) => {
        dataPoint[`axis${index}`] = value;
      });

      setDriftData(prev => {
        const newData = [...prev, dataPoint];
        // Keep only last MAX_SAMPLES
        return newData.slice(-MAX_SAMPLES);
      });

      animationFrameRef.current = requestAnimationFrame(capture);
    };

    animationFrameRef.current = requestAnimationFrame(capture);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCapturing, gamepad]);

  const handleStart = () => {
    startTimeRef.current = Date.now();
    setDriftData([]);
    setIsCapturing(true);
  };

  const handleStop = () => {
    setIsCapturing(false);
  };

  const handleReset = () => {
    setIsCapturing(false);
    setDriftData([]);
  };

  const axisCount = gamepad?.axes.length || 0;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Drift Test</h3>
        </div>
        <div className="flex gap-2">
          {!isCapturing ? (
            <Button onClick={handleStart} size="sm" disabled={!gamepad}>
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button onClick={handleStop} size="sm" variant="destructive">
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
          )}
          <Button onClick={handleReset} size="sm" variant="outline" disabled={driftData.length === 0}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {driftData.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-md bg-muted/30">
          <p className="text-sm text-muted-foreground">
            {gamepad ? 'Press Start to begin capturing drift data' : 'No controller connected'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={driftData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0 0)" />
              <XAxis
                dataKey="time"
                label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }}
                stroke="oklch(0.65 0 0)"
                tick={{ fill: 'oklch(0.65 0 0)' }}
              />
              <YAxis
                domain={[-1, 1]}
                label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
                stroke="oklch(0.65 0 0)"
                tick={{ fill: 'oklch(0.65 0 0)' }}
              />
              <Legend />
              {Array.from({ length: axisCount }).map((_, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={`axis${index}`}
                  stroke={COLORS[index % COLORS.length]}
                  dot={false}
                  strokeWidth={2}
                  name={`Axis ${index}`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>

          <div className="rounded-md bg-muted/50 p-3 text-xs">
            <div className="font-medium text-foreground">
              Samples: {driftData.length} | Duration: {driftData[driftData.length - 1]?.time.toFixed(1)}s
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
