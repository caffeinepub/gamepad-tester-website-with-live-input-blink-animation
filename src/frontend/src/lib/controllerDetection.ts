export interface ControllerInfo {
  displayName: string;
  family: 'ps5-dualsense' | 'ps5-dualsense-edge' | 'ps4-dualshock' | 'ps3' | 'xbox' | 'generic';
  supportsCalibration: boolean;
}

export function detectController(gamepadId: string): ControllerInfo {
  const id = gamepadId.toLowerCase();

  // PS5 DualSense Edge
  if (id.includes('dualsense edge') || id.includes('054c-0df2')) {
    return {
      displayName: 'PS5 DualSense Edge',
      family: 'ps5-dualsense-edge',
      supportsCalibration: true,
    };
  }

  // PS5 DualSense
  if (id.includes('dualsense') || id.includes('054c-0ce6')) {
    return {
      displayName: 'PS5 DualSense',
      family: 'ps5-dualsense',
      supportsCalibration: true,
    };
  }

  // PS4 DualShock 4
  if (
    id.includes('dualshock') ||
    id.includes('054c-05c4') ||
    id.includes('054c-09cc') ||
    id.includes('wireless controller')
  ) {
    return {
      displayName: 'PS4 DualShock 4',
      family: 'ps4-dualshock',
      supportsCalibration: true,
    };
  }

  // PS3 Controller
  if (id.includes('playstation 3') || id.includes('054c-0268') || id.includes('sixaxis')) {
    return {
      displayName: 'PS3 Controller',
      family: 'ps3',
      supportsCalibration: false,
    };
  }

  // Xbox Controllers (One, Series X/S)
  if (
    id.includes('xbox') ||
    id.includes('xinput') ||
    id.includes('045e-02ea') ||
    id.includes('045e-0b13') ||
    id.includes('045e-0b12')
  ) {
    return {
      displayName: 'Xbox Controller',
      family: 'xbox',
      supportsCalibration: false,
    };
  }

  // Generic fallback
  return {
    displayName: 'Generic Gamepad',
    family: 'generic',
    supportsCalibration: false,
  };
}
