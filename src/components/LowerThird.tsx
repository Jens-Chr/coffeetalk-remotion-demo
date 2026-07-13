import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

export type LowerThirdProps = {
  name: string;
  description: string;
};

const ENTER_DURATION_IN_FRAMES = 20;
const EXIT_DURATION_IN_FRAMES = 20;
const DISPLAY_DURATION_IN_SECONDS = 10;
const SHINE_INTERVAL_IN_SECONDS = 3.5;
const SHINE_DURATION_IN_SECONDS = 0.7;
const SHINE_START_IN_SECONDS = 2.5;

export const LowerThird: React.FC<LowerThirdProps> = ({name, description}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const exitStart = fps * DISPLAY_DURATION_IN_SECONDS - EXIT_DURATION_IN_FRAMES;
  const entrance = spring({
    frame,
    fps,
    durationInFrames: ENTER_DURATION_IN_FRAMES,
    config: {damping: 18, mass: 0.7, stiffness: 130},
  });
  const exit = interpolate(
    frame,
    [exitStart, exitStart + EXIT_DURATION_IN_FRAMES],
    [0, 1],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );
  const opacity = interpolate(
    frame,
    [0, ENTER_DURATION_IN_FRAMES, exitStart, exitStart + EXIT_DURATION_IN_FRAMES],
    [0, 1, 1, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );
  const shineInterval = Math.round(fps * SHINE_INTERVAL_IN_SECONDS);
  const shineDuration = Math.round(fps * SHINE_DURATION_IN_SECONDS);
  const shineStart = Math.round(fps * SHINE_START_IN_SECONDS);
  const shineFrame = (frame - shineStart) % shineInterval;
  const shineProgress = interpolate(shineFrame, [0, shineDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shineOpacity =
    frame >= shineStart && shineFrame >= 0 && shineFrame <= shineDuration
      ? interpolate(shineProgress, [0, 0.3, 0.7, 1], [0, 0.22, 0.22, 0])
      : 0;

  return (
    <div
      style={{
        bottom: 80,
        display: "flex",
        left: 80,
        opacity,
        position: "absolute",
        translate: `${interpolate(entrance, [0, 1], [-90, 0]) - exit * 45}px 0`,
        width: 650,
      }}
    >
      <div
        style={{
          backgroundColor: "#0ca9bc",
          borderRadius: "18px 0 0 18px",
          flex: "0 0 12px",
        }}
      />
      <div
        style={{
          backgroundColor: "rgba(0, 55, 79, 0.94)",
          borderRadius: "0 18px 18px 0",
          boxShadow: "0 18px 42px rgba(0, 25, 37, 0.28)",
          boxSizing: "border-box",
          overflow: "hidden",
          padding: "30px 38px 32px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.04) 42%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.04) 58%, transparent 80%)",
            height: "220%",
            left: 0,
            opacity: shineOpacity,
            pointerEvents: "none",
            position: "absolute",
            top: "-60%",
            translate: `${interpolate(shineProgress, [0, 1], [-300, 720])}px 0`,
            width: 180,
          }}
        />
        <div
          style={{
            color: "#ffffff",
            fontFamily: '"Ainslie Sans", Ainslie, "Trebuchet MS", sans-serif',
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -0.7,
            lineHeight: 1.1,
            position: "relative",
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "rgba(245, 245, 245, 0.88)",
            display: "-webkit-box",
            fontFamily: '"Open Sans", Arial, sans-serif',
            fontSize: 24,
            lineHeight: 1.42,
            marginTop: 14,
            overflow: "hidden",
            position: "relative",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
