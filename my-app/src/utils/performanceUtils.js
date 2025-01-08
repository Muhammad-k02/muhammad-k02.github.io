// Performance optimization utilities

// GPU acceleration helper
export const enableGPUAcceleration = (element) => {
  if (element) {
    element.style.transform = 'translateZ(0)';
    element.style.willChange = 'transform';
    element.style.backfaceVisibility = 'hidden';
  }
};

// Layer management
export const optimizeLayer = (element) => {
  if (element) {
    element.style.contain = 'paint layout';
    element.style.isolation = 'isolate';
  }
};

// Memory management
export class MemoryManager {
  static weakRefs = new WeakMap();
  
  static registerCleanup(component, cleanup) {
    this.weakRefs.set(component, cleanup);
  }
  
  static cleanup(component) {
    const cleanup = this.weakRefs.get(component);
    if (cleanup) {
      cleanup();
      this.weakRefs.delete(component);
    }
  }
}

// Animation frame manager
export class AnimationManager {
  static frameCallbacks = new Set();
  static isRunning = false;

  static addFrameCallback(callback) {
    this.frameCallbacks.add(callback);
    if (!this.isRunning) {
      this.startLoop();
    }
  }

  static removeFrameCallback(callback) {
    this.frameCallbacks.delete(callback);
    if (this.frameCallbacks.size === 0) {
      this.stopLoop();
    }
  }

  static startLoop() {
    this.isRunning = true;
    this.loop();
  }

  static stopLoop() {
    this.isRunning = false;
  }

  static loop() {
    if (!this.isRunning) return;

    for (const callback of this.frameCallbacks) {
      callback();
    }

    requestAnimationFrame(() => this.loop());
  }
}

// Performance monitoring
export class PerformanceMonitor {
  static metrics = new Map();

  static startMeasure(label) {
    if (performance.mark) {
      performance.mark(`${label}-start`);
    }
  }

  static endMeasure(label) {
    if (performance.mark && performance.measure) {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      
      const entries = performance.getEntriesByName(label);
      if (entries.length > 0) {
        this.metrics.set(label, entries[0].duration);
      }
    }
  }

  static getMetrics() {
    return Object.fromEntries(this.metrics);
  }
}

// Resource preloading utility
export const preloadResources = (resources) => {
  const preloadedImages = new Map();

  resources.forEach(resource => {
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(resource)) {
      // For images, use Image object instead of link preload
      const img = new Image();
      img.src = resource;
      preloadedImages.set(resource, img);
    } else if (resource.endsWith('.js')) {
      const script = document.createElement('script');
      script.rel = 'preload';
      script.as = 'script';
      script.href = resource;
      document.head.appendChild(script);
    } else if (resource.endsWith('.css')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = resource;
      document.head.appendChild(link);
    }
  });

  return preloadedImages;
};

// Debounce utility for performance optimization
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for performance optimization
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Cache management utility
export class CacheManager {
  static cache = new Map();
  static maxSize = 100;

  static set(key, value, ttl = 300000) { // 5 minutes default TTL
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }

  static get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  static clear() {
    this.cache.clear();
  }
} 