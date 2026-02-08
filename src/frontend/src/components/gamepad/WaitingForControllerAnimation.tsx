import { Gamepad2 } from 'lucide-react';

export default function WaitingForControllerAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="relative">
        {/* Pulsing rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 animate-ping rounded-full bg-success/20" style={{ animationDuration: '2s' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 animate-ping rounded-full bg-success/30" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
        </div>
        
        {/* Center gamepad icon */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success/30 to-success/10 shadow-lg">
          <Gamepad2 className="h-10 w-10 animate-pulse text-success" style={{ animationDuration: '2s' }} />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold">Waiting for Controller</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect a gamepad via USB or Bluetooth and press any button to begin testing.
        </p>
      </div>
      
      {/* Animated dots */}
      <div className="flex gap-2">
        <div className="h-2 w-2 animate-bounce rounded-full bg-success" style={{ animationDelay: '0s' }} />
        <div className="h-2 w-2 animate-bounce rounded-full bg-success" style={{ animationDelay: '0.2s' }} />
        <div className="h-2 w-2 animate-bounce rounded-full bg-success" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}
