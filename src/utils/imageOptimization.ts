
// Image optimization utilities for performance improvements

export const getOptimizedImageProps = (index: number, isAboveFold: boolean = false) => {
  return {
    loading: (isAboveFold || index < 3) ? "eager" as const : "lazy" as const,
    decoding: (isAboveFold || index < 2) ? "sync" as const : "async" as const,
    fetchpriority: (isAboveFold || index < 2) ? "high" as const : "low" as const,
  };
};

export const preloadCriticalImages = (imageUrls: string[]) => {
  // Preload first 2-3 critical images
  imageUrls.slice(0, 3).forEach((url, index) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    if (index === 0) {
      link.setAttribute('fetchpriority', 'high');
    }
    document.head.appendChild(link);
  });
};

export const getResponsiveImageSizes = (breakpoints?: string) => {
  return breakpoints || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
};

// Intersection Observer for lazy loading optimization
export const createImageObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (!('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
};
