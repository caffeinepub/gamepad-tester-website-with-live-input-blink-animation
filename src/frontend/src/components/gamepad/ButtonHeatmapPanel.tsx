import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Flame, RotateCcw } from 'lucide-react';

interface ButtonHeatmapPanelProps {
  gamepad: Gamepad | null;
}

export default function ButtonHeatmapPanel({ gamepad }: ButtonHeatmapPanelProps) {
  const [heatmapData, setHeatmapData] = useState<number[]>([]);
  const previousButtonStatesRef = useRef<boolean[]>([]);

  // Initialize heatmap data when gamepad changes
  useEffect(() => {
    if (gamepad) {
      setHeatmapData(new Array(gamepad.buttons.length).fill(0));
      previousButtonStatesRef.current = new Array(gamepad.buttons.length).fill(false);
    }
  }, [gamepad?.index]);

  // Track button presses
  useEffect(() => {
    if (!gamepad) return;

    gamepad.buttons.forEach((button, index) => {
      const wasPressed = previousButtonStatesRef.current[index];
      const isPressed = button.pressed;

      // Detect rising edge (button just pressed)
      if (isPressed && !wasPressed) {
        setHeatmapData(prev => {
          const newData = [...prev];
          newData[index] = (newData[index] || 0) + 1;
          return newData;
        });
      }

      previousButtonStatesRef.current[index] = isPressed;
    });
  }, [gamepad]);

  const handleReset = () => {
    if (gamepad) {
      setHeatmapData(new Array(gamepad.buttons.length).fill(0));
    }
  };

  const maxCount = Math.max(...heatmapData, 1);

  const getHeatColor = (count: number) => {
    const intensity = count / maxCount;
    if (intensity === 0) return 'bg-muted/30';
    if (intensity < 0.25) return 'bg-success/20';
    if (intensity < 0.5) return 'bg-success/40';
    if (intensity < 0.75) return 'bg-warning/60';
    return 'bg-destructive/70';
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Button Heatmap</h3>
        </div>
        <Button onClick={handleReset} size="sm" variant="outline" disabled={!gamepad}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      {!gamepad ? (
        <div className="flex h-48 items-center justify-center rounded-md bg-muted/30">
          <p className="text-sm text-muted-foreground">No controller connected</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {heatmapData.map((count, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-border p-4 transition-all duration-200 ${getHeatColor(count)}`}
              >
                <div className="text-xs font-medium text-muted-foreground">B{index}</div>
                <div className="mt-1 text-lg font-bold text-foreground">{count}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-md bg-muted/50 p-3 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-muted/30 border border-border" />
                <span className="text-muted-foreground">0</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-success/20" />
                <span className="text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-warning/60" />
                <span className="text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-destructive/70" />
                <span className="text-muted-foreground">High</span>
              </div>
            </div>
            <div className="font-medium text-foreground">
              Total: {heatmapData.reduce((sum, count) => sum + count, 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
