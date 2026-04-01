import requestIp from 'request-ip';
import type { Request } from "express";

export const getClientIP = (req: Request): string => {
  // Get client IP with better detection
  let clientIp = requestIp.getClientIp(req);
  
  // Function to check if IP is localhost
  const isLocalhost = (ip?: string) => {
    return ip === '::1' || 
           ip === '127.0.0.1' || 
           ip === '::ffff:127.0.0.1' ||
           ip?.startsWith('127.') ||
           ip?.startsWith('::ffff:127.');
  };
  
  // Handle localhost cases first
  if (isLocalhost(clientIp)) {
    clientIp = '';
  } else if (!clientIp) {
    // Fallback IP detection if requestIp fails
    clientIp = (req.headers['x-forwarded-for'] as string | undefined) || 
               (req.headers['x-real-ip'] as string | undefined) || 
               (req.headers['x-client-ip'] as string | undefined) || 
               req.connection?.remoteAddress || 
               req.socket?.remoteAddress || 
               req.ip ;
    
    // Clean up the IP address (remove port if present)
    if (clientIp && clientIp.includes(':')) {
      clientIp = clientIp.split(':')[0];
    }
    
    // If still localhost, try to get real IP
    if (isLocalhost(clientIp)) {
      const forwardedFor = req.headers['x-forwarded-for'];
      if (typeof forwardedFor === "string") {
        clientIp = forwardedFor.split(',')[0]?.trim();
      } else if (Array.isArray(forwardedFor)) {
        clientIp = forwardedFor[0]?.split(',')[0]?.trim();
      }
    }
  }
  
  // Final check for localhost
  if (isLocalhost(clientIp)) {
    clientIp = '';
  }
  
  // Ensure we always return a non-empty string
  if (!clientIp || clientIp.trim() === '') {
    clientIp = '';
  }
  
  return clientIp;
}; 