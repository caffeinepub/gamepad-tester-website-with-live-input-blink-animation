import { useEffect, useRef, useState } from 'react';
import { Compass, AlertCircle } from 'lucide-react';

interface GyroImuPanelProps {
  gamepad: Gamepad | null;
}

export default function GyroImuPanel({ gamepad }: GyroImuPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [hasMotionData, setHasMotionData] = useState(false);

  useEffect(() => {
    if (!gamepad) return;

    // Check for motion/orientation data
    const gp = gamepad as any;
    const hasData = !!(
      gp.pose ||
      gp.orientation ||
      gp.angularVelocity ||
      gp.linearAcceleration
    );

    setHasMotionData(hasData);

    if (hasData) {
      // Extract orientation data
      let alpha = 0, beta = 0, gamma = 0;

      if (gp.pose && gp.pose.orientation) {
        // Quaternion to Euler angles (simplified)
        const q = gp.pose.orientation;
        alpha = Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), 1 - 2 * (q[2] * q[2] + q[3] * q[3])) * (180 / Math.PI);
        beta = Math.asin(2 * (q[0] * q[2] - q[3] * q[1])) * (180 / Math.PI);
        gamma = Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), 1 - 2 * (q[1] * q[1] + q[2] * q[2])) * (180 / Math.PI);
      } else if (gp.orientation) {
        alpha = gp.orientation[0] || 0;
        beta = gp.orientation[1] || 0;
        gamma = gp.orientation[2] || 0;
      }

      setOrientation({ alpha, beta, gamma });
    }
  }, [gamepad]);

  // Draw 3D cube
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasMotionData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Convert orientation to radians
    const rotX = orientation.beta * (Math.PI / 180);
    const rotY = orientation.gamma * (Math.PI / 180);
    const rotZ = orientation.alpha * (Math.PI / 180);

    // Cube vertices
    const size = 40;
    const vertices = [
      [-size, -size, -size],
      [size, -size, -size],
      [size, size, -size],
      [-size, size, -size],
      [-size, -size, size],
      [size, -size, size],
      [size, size, size],
      [-size, size, size],
    ];

    // Rotate and project vertices
    const projectedVertices = vertices.map(([x, y, z]) => {
      // Rotate around X axis
      let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      // Rotate around Y axis
      let x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
      let z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);

      // Rotate around Z axis
      let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
      let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

      // Project to 2D
      const scale = 200 / (200 + z2);
      return {
        x: centerX + x3 * scale,
        y: centerY + y3 * scale,
      };
    });

    // Draw cube edges
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
    ];

    // Get theme color
    const isDark = document.documentElement.classList.contains('dark');
    ctx.strokeStyle = isDark ? 'oklch(0.70 0.20 145)' : 'oklch(0.65 0.18 145)';
    ctx.lineWidth = 2;

    edges.forEach(([start, end]) => {
      ctx.beginPath();
      ctx.moveTo(projectedVertices[start].x, projectedVertices[start].y);
      ctx.lineTo(projectedVertices[end].x, projectedVertices[end].y);
      ctx.stroke();
    });

    // Draw vertices
    ctx.fillStyle = isDark ? 'oklch(0.70 0.20 145)' : 'oklch(0.65 0.18 145)';
    projectedVertices.forEach(vertex => {
      ctx.beginPath();
      ctx.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [orientation, hasMotionData]);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Compass className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Gyroscope / IMU</h3>
      </div>

      {!hasMotionData ? (
        <div className="flex items-start gap-3 rounded-md bg-muted/50 p-4">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">No motion/IMU data available</p>
            <p className="mt-1 text-xs text-muted-foreground">
              This controller does not expose motion or orientation data via the Gamepad API.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="rounded-md bg-muted/30"
              style={{ perspective: '1000px' }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-md bg-muted/50 p-4">
            <div className="text-center">
              <div className="text-xs font-medium text-muted-foreground">Alpha (Z)</div>
              <div className="mt-1 font-mono text-sm font-semibold">
                {orientation.alpha.toFixed(1)}°
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-muted-foreground">Beta (X)</div>
              <div className="mt-1 font-mono text-sm font-semibold">
                {orientation.beta.toFixed(1)}°
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-muted-foreground">Gamma (Y)</div>
              <div className="mt-1 font-mono text-sm font-semibold">
                {orientation.gamma.toFixed(1)}°
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
