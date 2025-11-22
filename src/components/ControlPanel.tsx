import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, RotateCcw } from "lucide-react";

interface ControlPanelProps {
  velocity: number;
  angle: number;
  gravity: number;
  onVelocityChange: (value: number) => void;
  onAngleChange: (value: number) => void;
  onGravityChange: (value: number) => void;
  onLaunch: () => void;
  onReset: () => void;
  isLaunched: boolean;
}

export const ControlPanel = ({
  velocity,
  angle,
  gravity,
  onVelocityChange,
  onAngleChange,
  onGravityChange,
  onLaunch,
  onReset,
  isLaunched,
}: ControlPanelProps) => {
  return (
    <Card className="p-6 space-y-6 bg-card border-border">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Velocity</label>
          <span className="text-sm text-primary font-mono">{velocity} m/s</span>
        </div>
        <Slider
          value={[velocity]}
          onValueChange={([v]) => onVelocityChange(v)}
          min={10}
          max={100}
          step={1}
          disabled={isLaunched}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Angle</label>
          <span className="text-sm text-primary font-mono">{angle}°</span>
        </div>
        <Slider
          value={[angle]}
          onValueChange={([a]) => onAngleChange(a)}
          min={0}
          max={90}
          step={1}
          disabled={isLaunched}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Gravity</label>
          <span className="text-sm text-primary font-mono">{gravity} m/s²</span>
        </div>
        <Slider
          value={[gravity]}
          onValueChange={([g]) => onGravityChange(g)}
          min={1}
          max={20}
          step={0.5}
          disabled={isLaunched}
          className="w-full"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={onLaunch}
          disabled={isLaunched}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow transition-smooth"
        >
          <Rocket className="mr-2 h-4 w-4" />
          Launch
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 border-border hover:bg-secondary transition-smooth"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </Card>
  );
};
