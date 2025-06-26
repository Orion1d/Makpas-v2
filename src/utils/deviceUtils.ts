
export const isTouchDevice = (): boolean => {
  return window.matchMedia('(hover: none)').matches;
};

export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
