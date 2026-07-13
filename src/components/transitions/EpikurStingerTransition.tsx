import type {ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const STINGER_DURATION_IN_SECONDS = 2;

export type EpikurStingerTransitionProps = {
  from: ReactNode;
  to: ReactNode;
  durationInFrames?: number;
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const EpikurStingerTransition: React.FC<
  EpikurStingerTransitionProps
> = ({from, to, durationInFrames: durationInFramesProp}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const durationInFrames =
    durationInFramesProp ?? Math.round(STINGER_DURATION_IN_SECONDS * fps);
  const at = (referenceFrame: number) =>
    (referenceFrame / 60) * durationInFrames;
  const ease = Easing.bezier(0.22, 1, 0.36, 1);

  const fromOpacity = interpolate(frame, [at(0), at(12)], [1, 0], {
    ...clamp,
    easing: ease,
  });
  const dimOpacity = interpolate(
    frame,
    [at(0), at(8), at(16), at(18)],
    [0, 0.58, 0.58, 0],
    clamp,
  );
  const toOpacity = interpolate(frame, [at(40), at(58)], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const toScale = interpolate(frame, [at(40), at(58)], [1.02, 1], {
    ...clamp,
    easing: ease,
  });
  const fromScale = interpolate(frame, [at(0), at(12)], [1, 1.02], clamp);

  const panelProgress = interpolate(
    frame,
    [at(6), at(16), at(40), at(58)],
    [0, 1, 1, 2],
    {...clamp, easing: ease},
  );
  const panelX = interpolate(panelProgress, [0, 1, 2], [-112, 0, 112], clamp);
  const accentX = interpolate(
    frame,
    [at(7), at(16), at(40), at(55)],
    [-115, 0, 0, 115],
    {...clamp, easing: ease},
  );
  const lightX = interpolate(
    frame,
    [at(9), at(17), at(39), at(52)],
    [-120, 0, 0, 120],
    {...clamp, easing: ease},
  );

  const logoSpring = spring({
    frame: frame - at(14),
    fps,
    durationInFrames: Math.max(1, Math.round(at(12))),
    config: {damping: 24, mass: 0.8, stiffness: 120},
  });
  const logoOpacity = interpolate(
    frame,
    [at(14), at(20), at(40), at(46)],
    [0, 1, 1, 0],
    clamp,
  );
  const shineProgress = interpolate(frame, [at(25), at(35)], [0, 1], clamp);
  const shineOpacity = interpolate(
    frame,
    [at(25), at(27), at(33), at(35)],
    [0, 0.14, 0.14, 0],
    clamp,
  );
  const logoWidth = Math.min(500, width * 0.27);

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <AbsoluteFill style={{opacity: toOpacity, scale: toScale}}>{to}</AbsoluteFill>
      <AbsoluteFill style={{opacity: fromOpacity, scale: fromScale}}>
        {from}
      </AbsoluteFill>
      <AbsoluteFill
        style={{backgroundColor: "#00374f", opacity: dimOpacity}}
      />

      <AbsoluteFill
        style={{
          backgroundColor: "#dcf7fa",
          clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
          translate: `${lightX}% 0`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: "#0ca9bc",
          clipPath: "polygon(0 0, 100% 0, 94% 100%, 0 100%)",
          translate: `${accentX}% 0`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg, #00374f 0%, #00374f 68%, #06465f 100%)",
          clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)",
          translate: `${panelX}% 0`,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          opacity: logoOpacity,
          pointerEvents: "none",
          scale: interpolate(logoSpring, [0, 1], [0.94, 1]),
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 22,
            display: "flex",
            justifyContent: "center",
            padding: "34px 48px",
          }}
        >
          <Img
            src={staticFile("image/epikur_logo.png")}
            style={{height: "auto", width: logoWidth}}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(110deg, transparent 42%, rgba(255,255,255,0.9) 50%, transparent 58%)",
          opacity: shineOpacity,
          pointerEvents: "none",
          translate: `${interpolate(shineProgress, [0, 1], [-100, 100])}% 0`,
        }}
      />
    </AbsoluteFill>
  );
};
