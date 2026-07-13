import {Composition} from "remotion";
import {Bauchbinde} from "./Bauchbinde";
import {Demo} from "./Demo";
import {
  EpikurMatte,
  EPIKUR_MATTE_DURATION_IN_SECONDS,
} from "./EpikurMatte";
import {StingerDemo} from "./StingerDemo";
import {STINGER_DURATION_IN_SECONDS} from "./components/transitions/EpikurStingerTransition";
import {secondsToFrames, VIDEO_FPS} from "./config/video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Demo"
        component={Demo}
        durationInFrames={secondsToFrames(10)}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="EpikurMatte"
        component={EpikurMatte}
        durationInFrames={secondsToFrames(EPIKUR_MATTE_DURATION_IN_SECONDS)}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="EpikurStinger"
        component={StingerDemo}
        durationInFrames={secondsToFrames(STINGER_DURATION_IN_SECONDS)}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Bauchbinde"
        component={Bauchbinde}
        durationInFrames={secondsToFrames(10)}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
