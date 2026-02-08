import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FEATURES = [
  {
    icon: '/assets/generated/feature-gamepad.dim_96x96.png',
    title: 'Universal Compatibility',
    description: 'Test any gamepad including PlayStation, Xbox, Nintendo Switch, and generic USB/Bluetooth controllers directly in your browser.',
  },
  {
    icon: '/assets/generated/feature-realtime.dim_96x96.png',
    title: 'Real-Time Feedback',
    description: 'Instant visualization of button presses, analog stick movements, and trigger pressure with live data updates.',
  },
  {
    icon: '/assets/generated/feature-vibration.dim_96x96.png',
    title: 'Vibration Testing',
    description: 'Test rumble motors with multiple patterns and intensity controls to verify haptic feedback functionality.',
  },
  {
    icon: '/assets/generated/feature-gyro.dim_96x96.png',
    title: 'Gyro & Motion Sensors',
    description: 'Visualize 3D orientation and motion data with a rotating cube for controllers with gyroscope and accelerometer support.',
  },
  {
    icon: '/assets/generated/feature-drift.dim_96x96.png',
    title: 'Drift Detection',
    description: 'Track analog stick drift over time with time-series graphs to identify joystick calibration issues.',
  },
  {
    icon: '/assets/generated/feature-latency.dim_96x96.png',
    title: 'Latency Measurement',
    description: 'Measure input response time with reaction tests to ensure your controller performs optimally for competitive gaming.',
  },
];

export default function TesterFeaturesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              <img
                src={feature.icon}
                alt={feature.title}
                className="h-24 w-24 object-contain"
              />
              <h4 className="font-semibold text-lg">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
