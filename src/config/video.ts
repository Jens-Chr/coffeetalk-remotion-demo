export const VIDEO_FPS = 30;

export const secondsToFrames = (seconds: number): number =>
  seconds * VIDEO_FPS;
