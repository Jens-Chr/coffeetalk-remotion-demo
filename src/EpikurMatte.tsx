import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const EPIKUR_MATTE_DURATION_IN_SECONDS = 2;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/**
 * Luma matte: Black represents the outgoing scene, white the incoming scene.
 * The composition is intentionally opaque and strictly grayscale.
 */
export const EpikurMatte: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = Math.round(EPIKUR_MATTE_DURATION_IN_SECONDS * fps);
  const at = (progress: number) => progress * (duration - 1);
  const ease = Easing.bezier(0.65, 0, 0.35, 1);

  const mainX = interpolate(frame, [at(0.08), at(0.88)], [-112, 0], {
    ...clamp,
    easing: ease,
  });
  const softEdgeX = interpolate(frame, [at(0), at(0.8)], [-116, 0], {
    ...clamp,
    easing: ease,
  });
  const highlightX = interpolate(frame, [at(0.14), at(0.94)], [-120, 0], {
    ...clamp,
    easing: ease,
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#000000", overflow: "hidden"}}>
      <AbsoluteFill
        style={{
          backgroundColor: "#606060",
          clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
          translate: `${softEdgeX}% 0`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: "#b8b8b8",
          clipPath: "polygon(0 0, 100% 0, 94% 100%, 0 100%)",
          translate: `${highlightX}% 0`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: "#ffffff",
          clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)",
          translate: `${mainX}% 0`,
        }}
      />
    </AbsoluteFill>
  );
};
