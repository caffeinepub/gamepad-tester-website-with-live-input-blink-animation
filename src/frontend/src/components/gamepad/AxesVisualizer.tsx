interface AxesVisualizerProps {
  axes: readonly number[];
}

export default function AxesVisualizer({ axes }: AxesVisualizerProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Axes</h3>
      <div className="space-y-4">
        {axes.map((value, index) => {
          const isActive = Math.abs(value) > 0.1;
          const absValue = Math.abs(value);
          const isNegative = value < 0;

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">Axis {index}</span>
                <span
                  className={`font-mono font-semibold transition-colors duration-150 ${
                    isActive ? 'input-active text-success' : 'text-foreground'
                  }`}
                >
                  {value.toFixed(3)}
                </span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-md bg-muted">
                {/* Center line */}
                <div className="absolute left-1/2 top-0 h-full w-px bg-border" />
                
                {/* Animated bar from center */}
                <div
                  className={`absolute top-0 h-full transition-all duration-75 ${
                    isActive ? 'bg-success/30' : 'bg-primary/20'
                  }`}
                  style={{
                    left: isNegative ? `${50 - absValue * 50}%` : '50%',
                    width: `${absValue * 50}%`,
                  }}
                />
                
                {/* Active indicator at the end */}
                {isActive && (
                  <div
                    className="absolute top-0 h-full w-1 bg-success shadow-glow transition-all duration-75"
                    style={{
                      left: `${50 + value * 50}%`,
                      transform: 'translateX(-50%)',
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {axes.length === 0 && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No axes detected on this controller.
        </div>
      )}
    </div>
  );
}
