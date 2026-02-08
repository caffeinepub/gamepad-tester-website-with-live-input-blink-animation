import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Vibrate, AlertCircle } from 'lucide-react';

interface VibrationTestPanelProps {
  gamepad: Gamepad | null;
}

export default function VibrationTestPanel({ gamepad }: VibrationTestPanelProps) {
  const [intensity, setIntensity] = useState([0.5]);
  const [isVibrating, setIsVibrating] = useState(false);

  // Check if vibration is supported
  const vibrationActuator = (gamepad as any)?.vibrationActuator;
  const hapticActuators = (gamepad as any)?.hapticActuators;
  const supportsVibration = !!(vibrationActuator || (hapticActuators && hapticActuators.length > 0));

  const triggerVibration = async (duration: number, pattern: 'short' | 'long' | 'pulse') => {
    if (!gamepad || !supportsVibration) return;

    setIsVibrating(true);

    try {
      const intensityValue = intensity[0];

      if (vibrationActuator && vibrationActuator.playEffect) {
        // Modern Gamepad API
        if (pattern === 'short') {
          await vibrationActuator.playEffect('dual-rumble', {
            duration: 200,
            strongMagnitude: intensityValue,
            weakMagnitude: intensityValue * 0.5,
          });
        } else if (pattern === 'long') {
          await vibrationActuator.playEffect('dual-rumble', {
            duration: 1000,
            strongMagnitude: intensityValue,
            weakMagnitude: intensityValue * 0.5,
          });
        } else if (pattern === 'pulse') {
          // Pulse pattern: 3 short bursts
          for (let i = 0; i < 3; i++) {
            await vibrationActuator.playEffect('dual-rumble', {
              duration: 150,
              strongMagnitude: intensityValue,
              weakMagnitude: intensityValue * 0.5,
            });
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      } else if (hapticActuators && hapticActuators.length > 0) {
        // Fallback for older API
        const actuator = hapticActuators[0];
        if (actuator.pulse) {
          if (pattern === 'short') {
            await actuator.pulse(intensityValue, 200);
          } else if (pattern === 'long') {
            await actuator.pulse(intensityValue, 1000);
          } else if (pattern === 'pulse') {
            for (let i = 0; i < 3; i++) {
              await actuator.pulse(intensityValue, 150);
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }
        }
      }
    } catch (error) {
      console.error('Vibration error:', error);
    } finally {
      setIsVibrating(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Vibrate className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Vibration Test</h3>
      </div>

      {!supportsVibration ? (
        <div className="flex items-start gap-3 rounded-md bg-muted/50 p-4">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Not supported</p>
            <p className="mt-1 text-xs text-muted-foreground">
              This controller or browser does not support vibration/haptic feedback.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Intensity: {Math.round(intensity[0] * 100)}%
            </label>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              min={0}
              max={1}
              step={0.1}
              disabled={isVibrating}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => triggerVibration(200, 'short')}
              disabled={isVibrating}
              variant="outline"
              className="w-full"
            >
              Short
            </Button>
            <Button
              onClick={() => triggerVibration(1000, 'long')}
              disabled={isVibrating}
              variant="outline"
              className="w-full"
            >
              Long
            </Button>
            <Button
              onClick={() => triggerVibration(500, 'pulse')}
              disabled={isVibrating}
              variant="outline"
              className="w-full"
            >
              Pulse
            </Button>
          </div>

          {isVibrating && (
            <p className="text-center text-xs text-muted-foreground">Vibrating...</p>
          )}
        </div>
      )}
    </div>
  );
}
