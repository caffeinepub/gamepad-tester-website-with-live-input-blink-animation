import { useState, useEffect, useRef } from 'react';

export function useGamepads() {
  const [gamepads, setGamepads] = useState<Gamepad[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    const updateGamepads = () => {
      if (!mounted) return;

      const gamepadList = navigator.getGamepads();
      const connectedGamepads = Array.from(gamepadList).filter(
        (gp): gp is Gamepad => gp !== null
      );

      setGamepads(connectedGamepads);

      // Auto-select first controller if none selected
      if (connectedGamepads.length > 0 && selectedIndex === null) {
        setSelectedIndex(connectedGamepads[0].index);
      }

      // Continue polling
      animationFrameRef.current = requestAnimationFrame(updateGamepads);
    };

    const handleGamepadConnected = (e: GamepadEvent) => {
      console.log('Gamepad connected:', e.gamepad.id);
      // Auto-select if it's the first controller
      if (selectedIndex === null) {
        setSelectedIndex(e.gamepad.index);
      }
      updateGamepads();
    };

    const handleGamepadDisconnected = (e: GamepadEvent) => {
      console.log('Gamepad disconnected:', e.gamepad.id);
      updateGamepads();
    };

    // Add event listeners
    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // Start polling loop
    animationFrameRef.current = requestAnimationFrame(updateGamepads);

    // Cleanup
    return () => {
      mounted = false;
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, [selectedIndex]);

  // Fallback to first available controller if selected one disconnects
  useEffect(() => {
    if (selectedIndex !== null) {
      const stillConnected = gamepads.some(gp => gp.index === selectedIndex);
      if (!stillConnected && gamepads.length > 0) {
        setSelectedIndex(gamepads[0].index);
      } else if (!stillConnected && gamepads.length === 0) {
        setSelectedIndex(null);
      }
    }
  }, [gamepads, selectedIndex]);

  const selectedGamepad = gamepads.find(gp => gp.index === selectedIndex) || null;

  return {
    gamepads,
    selectedGamepad,
    selectedIndex,
    setSelectedIndex,
  };
}
