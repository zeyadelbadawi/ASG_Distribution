'use client'; // Ensure it's a client component

import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

const routerEvents = [
  'routeChangeStart',
  'beforeHistoryChange',
  'routeChangeComplete',
  'routeChangeError',
  'hashChangeStart',
  'hashChangeComplete',
];

const SingletonRouter = {
  router: null,
  readyCallbacks: [],

  ready(cb) {
    if (this.router) {
      cb();
    } else {
      this.readyCallbacks.push(cb());
    }
  },

  push(url, options = {}) {
    if (!this.router) {
      throw new Error('Router not initialized');
    }
    return this.router.push(url, options); // Use App Router push method
  },

  replace(url, options = {}) {
    if (!this.router) {
      throw new Error('Router not initialized');
    }
    return this.router.replace(url, options); // Use App Router replace method
  },

  initializeRouter() {
    if (typeof window !== 'undefined') {
      this.router = useRouter(); // Initialize only on the client side
      this.readyCallbacks.forEach((cb) => cb());
      this.readyCallbacks = [];
    }
  },
};

// Hook to access router in components
export function useCustomRouter() {
  if (!SingletonRouter.router) {
    SingletonRouter.initializeRouter(); // Ensure router is initialized
  }
  
  if (!SingletonRouter.router) {
    console.warn('NextRouter is not mounted yet, returning null');
    return null; // Avoid throwing an error, return null instead
  }

  return SingletonRouter;
}

// Initialize the router on the first import if on the client side
if (typeof window !== 'undefined') {
  SingletonRouter.initializeRouter();
}

export default SingletonRouter;



