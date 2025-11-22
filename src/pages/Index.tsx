import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Bootloader } from "@/components/Bootloader";
import { SimulatorCanvas } from "@/components/SimulatorCanvas";
import { ControlPanel } from "@/components/ControlPanel";

const Index = () => {
  const [showBootloader, setShowBootloader] = useState(true);
  const [velocity, setVelocity] = useState(50);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunched(true);
  };

  const handleReset = () => {
    setIsLaunched(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBootloader && (
          <Bootloader onComplete={() => setShowBootloader(false)} />
        )}
      </AnimatePresence>

      {!showBootloader && (
        <div className="min-h-screen p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <header className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold glow-text">
                Projectile Motion Simulator
              </h1>
              <p className="text-muted-foreground">
                Adjust parameters and launch to see physics in action
              </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-[500px]">
                <SimulatorCanvas
                  velocity={velocity}
                  angle={angle}
                  gravity={gravity}
                  isLaunched={isLaunched}
                  onReset={handleReset}
                />
              </div>

              <div className="lg:col-span-1">
                <ControlPanel
                  velocity={velocity}
                  angle={angle}
                  gravity={gravity}
                  onVelocityChange={setVelocity}
                  onAngleChange={setAngle}
                  onGravityChange={setGravity}
                  onLaunch={handleLaunch}
                  onReset={handleReset}
                  isLaunched={isLaunched}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
