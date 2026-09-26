/**
 * Secure PIN Hashing Utility
 * Uses the Web Crypto API (SHA-256) to hash admin credentials.
 * This ensures the plaintext PIN is never stored in source code.
 */

export const hashPin = async (pin: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};
