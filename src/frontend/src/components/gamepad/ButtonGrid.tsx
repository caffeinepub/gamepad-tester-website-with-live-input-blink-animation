interface ButtonGridProps {
  buttons: readonly GamepadButton[];
}

export default function ButtonGrid({ buttons }: ButtonGridProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Buttons</h3>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
        {buttons.map((button, index) => {
          const isPressed = button.pressed;
          const isTouched = button.touched;
          const value = button.value;

          return (
            <div
              key={index}
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all duration-150 ${
                isPressed
                  ? 'input-active border-success bg-success/20 shadow-glow'
                  : isTouched
                    ? 'border-warning bg-warning/10'
                    : 'border-border bg-muted/30'
              }`}
            >
              <div className="text-xs font-medium text-muted-foreground">B{index}</div>
              <div className="mt-1 text-lg font-bold">{Math.round(value * 100)}%</div>
              {isPressed && (
                <div className="absolute inset-0 rounded-lg bg-success/10 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
