import { Gamepad2, Zap, Eye, Code } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">About GamePad Tester</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A professional tool for testing and debugging game controllers in your browser.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
              <Zap className="h-5 w-5 text-success" />
            </div>
            <h3 className="mb-2 font-semibold">Real-Time Testing</h3>
            <p className="text-sm text-muted-foreground">
              Live visualization of all button presses and analog stick movements with instant feedback.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-warning/20">
              <Eye className="h-5 w-5 text-warning" />
            </div>
            <h3 className="mb-2 font-semibold">Visual Indicators</h3>
            <p className="text-sm text-muted-foreground">
              Clear blink animations and color-coded states make it easy to identify active inputs.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Code className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold">Browser API</h3>
            <p className="text-sm text-muted-foreground">
              Built using the standard Gamepad API, supporting all modern browsers and controller types.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">How to Use</h2>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                1
              </span>
              <span>Connect your gamepad via USB or Bluetooth to your computer.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                2
              </span>
              <span>Navigate to the Tester page and press any button on your controller.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                3
              </span>
              <span>Test all buttons and analog sticks to verify they're working correctly.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                4
              </span>
              <span>If you have multiple controllers, use the selector to switch between them.</span>
            </li>
          </ol>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-6">
          <h2 className="mb-3 text-lg font-semibold">Supported Controllers</h2>
          <p className="text-sm text-muted-foreground">
            This tester works with any controller that supports the standard Gamepad API, including Xbox controllers,
            PlayStation DualShock/DualSense, Nintendo Switch Pro Controller, and most third-party USB/Bluetooth
            gamepads.
          </p>
        </div>
      </div>
    </div>
  );
}
