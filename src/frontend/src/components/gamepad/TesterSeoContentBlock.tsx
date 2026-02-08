import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TesterSeoContentBlock() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Gamepad Tester Online – Check Controller Buttons, Joysticks & Vibration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p>
          Welcome to GamepadTester.online — the most advanced and accurate gamepad tester tool on the
          internet. Test every feature of your controller directly in your browser: button presses, joysticks,
          triggers, vibration (rumble), gyro/motion sensor, battery level, LED light bar, and much more.
        </p>

        <div>
          <h3 className="mb-3 text-xl font-semibold">What is a Gamepad Tester?</h3>
          <p className="mb-3">
            A gamepad tester also called a controller tester or joystick test tool helps you check whether
            every part of your controller is working correctly. You can test here:
          </p>
          <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
            <li>Button press/release detection in real-time</li>
            <li>Analog stick drift test (left/right sticks)</li>
            <li>Trigger pressure and sensitivity (L2/R2, LT/RT)</li>
            <li>Vibration / rumble motor test</li>
            <li>Gyroscope & motion sensor test (PS5/PS4, Switch)</li>
            <li>Battery level (Xbox / PS5 wireless)</li>
            <li>LED & light bar color test (DualSense / DualShock)</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xl font-semibold">How to Use the Online Gamepad Tester</h3>
          <ol className="ml-6 list-decimal space-y-1 text-muted-foreground">
            <li>Connect your controller using USB or Bluetooth.</li>
            <li>Press buttons, move sticks, pull triggers — the UI will react instantly.</li>
            <li>Use the vibration button to check rumble motors.</li>
            <li>For supported controllers, rotate the controller to test gyro sensors.</li>
          </ol>
          <p className="mt-3">This web app runs directly in your browser. No app installation required.</p>
        </div>

        <div>
          <h3 className="mb-3 text-xl font-semibold">Key Features (Why Users Love This Tool)</h3>
          <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
            <li>Real-time button visualizer — shows exactly what your controller sends</li>
            <li>Joystick drift analysis — detect stick drift issues easily</li>
            <li>Vibration / rumble testing — check both motors independently</li>
            <li>Motion sensor / gyro test (DualSense / Switch / DualShock)</li>
            <li>Battery & wireless information (PS / Xbox)</li>
            <li>Supports up to 6 controllers – test one by one</li>
            <li>Sound feedback option when pressing buttons or moving sticks</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xl font-semibold">Supported Controllers</h3>
          <p className="mb-3">Compatible with almost every controller:</p>
          <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
            <li>PlayStation PS3 / PS4 / PS5 (DualShock + DualSense)</li>
            <li>Xbox 360 / Xbox One / Xbox Series X/S</li>
            <li>Nintendo Switch Pro & Joy-Cons</li>
            <li>Logitech, Redgear, PowerA, PDP, and generic USB/Bluetooth controllers</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xl font-semibold">What Makes GamepadTester.online Better?</h3>
          <p className="mb-3">Many controller testers only highlight button presses. This tool gives you deep diagnostics:</p>
          <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
            <li>Joystick XY axis tracking</li>
            <li>Input latency response</li>
            <li>Drift and dead-zone visualization</li>
            <li>Motion sensor + 3D rotation graph</li>
          </ul>
          <p className="mt-3">
            Whether you're troubleshooting joystick drift, checking vibration motors, or verifying controller
            input for gaming tournaments — this tool gives fast, accurate results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
