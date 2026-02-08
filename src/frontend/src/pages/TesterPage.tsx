import { useState } from 'react';
import { useGamepads } from '../hooks/useGamepads';
import ButtonGrid from '../components/gamepad/ButtonGrid';
import AxesVisualizer from '../components/gamepad/AxesVisualizer';
import ControllerTabs from '../components/gamepad/ControllerTabs';
import VibrationTestPanel from '../components/gamepad/VibrationTestPanel';
import GyroImuPanel from '../components/gamepad/GyroImuPanel';
import DriftTestPanel from '../components/gamepad/DriftTestPanel';
import ButtonHeatmapPanel from '../components/gamepad/ButtonHeatmapPanel';
import LatencyTestPanel from '../components/gamepad/LatencyTestPanel';
import AnalogCalibrationPanel from '../components/gamepad/AnalogCalibrationPanel';
import WaitingForControllerAnimation from '../components/gamepad/WaitingForControllerAnimation';
import TesterPostContent from '../components/gamepad/TesterPostContent';
import { Gamepad2 } from 'lucide-react';
import { detectController } from '@/lib/controllerDetection';
import { DEFAULT_CALIBRATION, CalibrationSettings } from '@/lib/analogCalibration';

export default function TesterPage() {
  const { gamepads, selectedGamepad, selectedIndex, setSelectedIndex } = useGamepads();
  
  // Store calibration settings per controller index
  const [calibrationMap, setCalibrationMap] = useState<Record<number, CalibrationSettings>>({});

  const hasGamepads = gamepads.length > 0;

  const currentCalibration = selectedIndex !== null 
    ? (calibrationMap[selectedIndex] ?? DEFAULT_CALIBRATION)
    : DEFAULT_CALIBRATION;

  const handleCalibrationChange = (settings: CalibrationSettings) => {
    if (selectedIndex !== null) {
      setCalibrationMap(prev => ({
        ...prev,
        [selectedIndex]: settings,
      }));
    }
  };

  const controllerInfo = selectedGamepad ? detectController(selectedGamepad.id) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Connection Status - Interactive Area Anchor */}
        <div id="tester-interactive-area" className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  hasGamepads ? 'bg-success/20' : 'bg-muted'
                }`}
              >
                <Gamepad2 className={`h-5 w-5 ${hasGamepads ? 'text-success' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {hasGamepads ? 'Controller Connected' : 'No Gamepad Detected'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {hasGamepads
                    ? `${gamepads.length} controller${gamepads.length > 1 ? 's' : ''} available`
                    : 'Connect a gamepad and press any button'}
                </p>
              </div>
            </div>
          </div>

          {/* Controller Tabs */}
          {gamepads.length > 0 && (
            <div className="mt-4">
              <ControllerTabs
                gamepads={gamepads}
                selectedIndex={selectedIndex}
                onSelectController={setSelectedIndex}
              />
            </div>
          )}

          {/* Controller Info */}
          {selectedGamepad && controllerInfo && (
            <div className="mt-4 rounded-md bg-muted/50 p-4">
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Detected Controller:</span>
                  <span className="font-medium text-success">{controllerInfo.displayName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono text-foreground">{selectedGamepad.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Index:</span>
                  <span className="font-mono text-foreground">{selectedGamepad.index}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Buttons:</span>
                  <span className="font-mono text-foreground">{selectedGamepad.buttons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Axes:</span>
                  <span className="font-mono text-foreground">{selectedGamepad.axes.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* No Gamepad Message with Animation */}
        {!hasGamepads && (
          <div className="rounded-lg border border-border bg-card p-8">
            <WaitingForControllerAnimation />
          </div>
        )}

        {/* Live Input Visualization */}
        {selectedGamepad && (
          <>
            <ButtonGrid buttons={selectedGamepad.buttons} />
            <AxesVisualizer axes={selectedGamepad.axes} />
            
            {/* Calibration Panel */}
            <AnalogCalibrationPanel
              gamepad={selectedGamepad}
              calibrationSettings={currentCalibration}
              onCalibrationChange={handleCalibrationChange}
            />
            
            {/* Feature Panels */}
            <div className="grid gap-6 md:grid-cols-2">
              <VibrationTestPanel gamepad={selectedGamepad} />
              <GyroImuPanel gamepad={selectedGamepad} />
            </div>
            
            <DriftTestPanel gamepad={selectedGamepad} />
            <ButtonHeatmapPanel gamepad={selectedGamepad} />
            <LatencyTestPanel gamepad={selectedGamepad} />
          </>
        )}

        {/* Post-Tester Content (SEO Block, FAQ, Gamepad List, Footer Links) */}
        <TesterPostContent />
      </div>
    </div>
  );
}
