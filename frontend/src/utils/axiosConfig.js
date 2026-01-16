import axios from 'axios';

// Detect iOS Safari
export const isIOSSafari = () => {
  if (typeof window === 'undefined') return false;
  
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua);
  
  return isIOS && isSafari;
};

// Configure axios defaults for better iOS Safari compatibility
const axiosInstance = axios.create({
  timeout: 15000, // Increased timeout for iOS Safari (15 seconds)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // iOS Safari specific configurations
  withCredentials: false, // Avoid CORS issues on iOS
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
});

// Request interceptor for iOS Safari
axiosInstance.interceptors.request.use(
  (config) => {
    // Add cache-busting for iOS Safari if needed
    if (isIOSSafari() && config.method === 'get') {
      // iOS Safari can cache aggressively, add timestamp for critical requests
      const separator = config.url.includes('?') ? '&' : '?';
      config.url = `${config.url}${separator}_t=${Date.now()}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling for iOS Safari
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Enhanced error handling for iOS Safari
    if (isIOSSafari()) {
      if (error.code === 'ECONNABORTED') {
        console.warn('Request timeout on iOS Safari - this may be due to network conditions');
      } else if (!error.response) {
        console.warn('Network error on iOS Safari - check internet connection');
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
