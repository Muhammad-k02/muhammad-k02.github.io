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