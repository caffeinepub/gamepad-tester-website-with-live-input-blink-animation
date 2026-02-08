import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { detectController } from '@/lib/controllerDetection';
import { calibrateAxes, DEFAULT_CALIBRATION, CalibrationSettings } from '@/lib/analogCalibration';
import { AlertCircle } from 'lucide-react';

interface AnalogCalibrationPanelProps {
  gamepad: Gamepad;
  calibrationSettings: CalibrationSettings;
  onCalibrationChange: (settings: CalibrationSettings) => void;
}

export default function AnalogCalibrationPanel({
  gamepad,
  calibrationSettings,
  onCalibrationChange,
}: AnalogCalibrationPanelProps) {
  const controllerInfo = detectController(gamepad.id);
  const isSupported = controllerInfo.supportsCalibration;

  const calibratedValues = calibrateAxes(gamepad.axes, calibrationSettings);

  const formatValue = (value: number) => value.toFixed(3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analog Calibration</CardTitle>
        <CardDescription>
          Adjust dead zones to improve joystick precision
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isSupported && (
          <div className="flex items-start gap-3 rounded-md border border-warning/50 bg-warning/10 p-4">
            <AlertCircle className="h-5 w-5 text-warning" />
            <div className="flex-1 text-sm">
              <p className="font-medium text-warning">Calibration Not Available</p>
              <p className="mt-1 text-muted-foreground">
                Analog calibration is only available for PS4 DualShock, PS5 DualSense, and PS5 DualSense Edge controllers.
              </p>
            </div>
          </div>
        )}

        {/* Left Stick Dead Zone */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="left-deadzone" className={!isSupported ? 'text-muted-foreground' : ''}>
              Left Stick Dead Zone
            </Label>
            <span className="text-sm font-mono text-muted-foreground">
              {(calibrationSettings.leftStickDeadZone * 100).toFixed(0)}%
            </span>
          </div>
          <Slider
            id="left-deadzone"
            min={0}
            max={50}
            step={1}
            value={[calibrationSettings.leftStickDeadZone * 100]}
            onValueChange={(values) =>
              onCalibrationChange({
                ...calibrationSettings,
                leftStickDeadZone: values[0] / 100,
              })
            }
            disabled={!isSupported}
            className="w-full"
          />
          <div className="grid grid-cols-2 gap-4 rounded-md bg-muted/50 p-3 text-xs">
            <div>
              <div className="text-muted-foreground">Raw X/Y:</div>
              <div className="font-mono">
                {formatValue(gamepad.axes[0] ?? 0)} / {formatValue(gamepad.axes[1] ?? 0)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Calibrated X/Y:</div>
              <div className="font-mono text-success">
                {formatValue(calibratedValues.leftX)} / {formatValue(calibratedValues.leftY)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Stick Dead Zone */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="right-deadzone" className={!isSupported ? 'text-muted-foreground' : ''}>
              Right Stick Dead Zone
            </Label>
            <span className="text-sm font-mono text-muted-foreground">
              {(calibrationSettings.rightStickDeadZone * 100).toFixed(0)}%
            </span>
          </div>
          <Slider
            id="right-deadzone"
            min={0}
            max={50}
            step={1}
            value={[calibrationSettings.rightStickDeadZone * 100]}
            onValueChange={(values) =>
              onCalibrationChange({
                ...calibrationSettings,
                rightStickDeadZone: values[0] / 100,
              })
            }
            disabled={!isSupported}
            className="w-full"
          />
          <div className="grid grid-cols-2 gap-4 rounded-md bg-muted/50 p-3 text-xs">
            <div>
              <div className="text-muted-foreground">Raw X/Y:</div>
              <div className="font-mono">
                {formatValue(gamepad.axes[2] ?? 0)} / {formatValue(gamepad.axes[3] ?? 0)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Calibrated X/Y:</div>
              <div className="font-mono text-success">
                {formatValue(calibratedValues.rightX)} / {formatValue(calibratedValues.rightY)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
