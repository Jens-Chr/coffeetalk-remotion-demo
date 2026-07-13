import {AbsoluteFill} from "remotion";
import {LowerThird} from "./components/LowerThird";

export const Bauchbinde: React.FC = () => {
  return (
    <AbsoluteFill>
      <LowerThird
        name="Jens-Christian Hübner"
        description="Kann kein React, ist zu ungeduldig für Videoschnitt und macht jetzt trotzdem Videos!"
      />
    </AbsoluteFill>
  );
};
