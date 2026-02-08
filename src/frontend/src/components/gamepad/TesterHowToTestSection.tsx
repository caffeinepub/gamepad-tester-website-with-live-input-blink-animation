import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const STEPS = [
  {
    icon: '/assets/generated/howto-step-connect.dim_96x96.png',
    title: 'Connect Your Controller',
    description: 'Plug in your gamepad via USB or connect wirelessly via Bluetooth. The tester will automatically detect it.',
  },
  {
    icon: '/assets/generated/howto-step-press.dim_96x96.png',
    title: 'Press Any Button',
    description: 'Press buttons on your controller to activate it. The interface will light up and show which controller is connected.',
  },
  {
    icon: '/assets/generated/howto-step-sticks.dim_96x96.png',
    title: 'Test Buttons & Sticks',
    description: 'Press all buttons, move analog sticks, and pull triggers. Watch the real-time visualization respond to your inputs.',
  },
  {
    icon: '/assets/generated/howto-step-calibrate.dim_96x96.png',
    title: 'Use Advanced Features',
    description: 'Test vibration motors, check for stick drift, measure input latency, and calibrate dead zones using the diagnostic panels.',
  },
];

export default function TesterHowToTestSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">How to Test Your Gamepad</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-6">
          {STEPS.map((step, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <img
                  src={step.icon}
                  alt={`Step ${index + 1}: ${step.title}`}
                  className="h-20 w-20 object-contain"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-lg">
                  {index + 1}. {step.title}
                </h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
