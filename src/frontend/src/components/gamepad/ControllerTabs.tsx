import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { detectController } from '@/lib/controllerDetection';

interface ControllerTabsProps {
  gamepads: Gamepad[];
  selectedIndex: number | null;
  onSelectController: (index: number) => void;
}

export default function ControllerTabs({
  gamepads,
  selectedIndex,
  onSelectController,
}: ControllerTabsProps) {
  if (gamepads.length === 0) {
    return null;
  }

  if (gamepads.length === 1) {
    const controllerInfo = detectController(gamepads[0].id);
    return (
      <div className="rounded-md bg-muted/50 px-4 py-2 text-sm font-medium text-foreground">
        Controller 1: {controllerInfo.displayName}
      </div>
    );
  }

  return (
    <Tabs
      value={selectedIndex?.toString() ?? gamepads[0].index.toString()}
      onValueChange={(value) => onSelectController(parseInt(value))}
    >
      <TabsList className="w-full justify-start overflow-x-auto">
        {gamepads.map((gamepad) => {
          const controllerInfo = detectController(gamepad.id);
          return (
            <TabsTrigger key={gamepad.index} value={gamepad.index.toString()}>
              {controllerInfo.displayName}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
