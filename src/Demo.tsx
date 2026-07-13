import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({
    frame,
    fps,
    config: {damping: 18, mass: 0.8, stiffness: 100},
  });
  const opacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowX = interpolate(frame, [0, fps * 10], [-350, 2050], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 50% 35%, #24345d 0%, #11172d 42%, #080b16 100%)",
        color: "white",
        display: "flex",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "rgba(94, 234, 212, 0.16)",
          borderRadius: "50%",
          filter: "blur(80px)",
          height: 420,
          left: glowX,
          position: "absolute",
          top: 120,
          width: 420,
        }}
      />
      <div
        style={{
          opacity,
          textAlign: "center",
          transform: `translateY(${interpolate(entrance, [0, 1], [70, 0])}px) scale(${interpolate(entrance, [0, 1], [0.94, 1])})`,
        }}
      >
        <div
          style={{
            color: "#5eead4",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 8,
            marginBottom: 30,
            textTransform: "uppercase",
          }}
        >
          Live Demo
        </div>
        <h1
          style={{
            fontSize: 116,
            letterSpacing: -5,
            lineHeight: 1,
            margin: 0,
          }}
        >
          Remotion + Codex
        </h1>
        <p
          style={{
            color: "#cbd5e1",
            fontSize: 44,
            fontWeight: 400,
            margin: "34px 0 0",
          }}
        >
          Videos mit React und TypeScript
        </p>
      </div>
    </AbsoluteFill>
  );
};
