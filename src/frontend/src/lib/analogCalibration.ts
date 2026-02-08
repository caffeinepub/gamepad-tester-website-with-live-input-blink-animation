export interface CalibrationSettings {
  leftStickDeadZone: number;
  rightStickDeadZone: number;
}

export const DEFAULT_CALIBRATION: CalibrationSettings = {
  leftStickDeadZone: 0.1,
  rightStickDeadZone: 0.1,
};

export interface CalibratedAxisValues {
  leftX: number;
  leftY: number;
  rightX: number;
  rightY: number;
}

/**
 * Apply dead zone calibration to axis values
 * @param value Raw axis value (-1 to 1)
 * @param deadZone Dead zone threshold (0 to 1)
 * @returns Calibrated value
 */
function applyDeadZone(value: number, deadZone: number): number {
  const absValue = Math.abs(value);
  
  if (absValue < deadZone) {
    return 0;
  }
  
  // Scale the remaining range
  const sign = value >= 0 ? 1 : -1;
  const scaled = (absValue - deadZone) / (1 - deadZone);
  return sign * Math.min(scaled, 1);
}

/**
 * Calibrate analog stick values with dead zone settings
 * @param axes Raw gamepad axes array
 * @param settings Calibration settings
 * @returns Calibrated axis values
 */
export function calibrateAxes(
  axes: readonly number[],
  settings: CalibrationSettings
): CalibratedAxisValues {
  // Standard gamepad mapping: axes[0-1] = left stick, axes[2-3] = right stick
  const leftX = axes[0] ?? 0;
  const leftY = axes[1] ?? 0;
  const rightX = axes[2] ?? 0;
  const rightY = axes[3] ?? 0;

  return {
    leftX: applyDeadZone(leftX, settings.leftStickDeadZone),
    leftY: applyDeadZone(leftY, settings.leftStickDeadZone),
    rightX: applyDeadZone(rightX, settings.rightStickDeadZone),
    rightY: applyDeadZone(rightY, settings.rightStickDeadZone),
  };
}
