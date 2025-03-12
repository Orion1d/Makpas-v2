
/**
 * Utility functions for device detection and performance optimization
 */

/**
 * Detects if the current device is a touch device
 */
export const isTouchDevice = (): boolean => {
  return window.matchMedia('(hover: none)').matches;
};

/**
 * Determines if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Creates a blur-up placeholder for images
 * @param width Width of the placeholder
 * @param height Height of the placeholder
 * @param color Base color for the placeholder
 */
export const createBlurPlaceholder = (
  width: number = 20, 
  height: number = 20, 
  color: string = '#e6e6e6'
): string => {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${color.replace('#', '%23')}' /%3E%3C/svg%3E`;
};

/**
 * Debounces a function to limit how often it can be called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function to ensure it's not called more often than the specified interval
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
