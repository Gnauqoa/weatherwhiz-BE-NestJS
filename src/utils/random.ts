import * as crypto from 'crypto';

export const generateRandomHexString = (length: number): string => {
  if (length <= 0) {
    throw new Error('Length must be a positive number');
  }

  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  const hexString = randomBytes.toString('hex');

  // If the desired length is odd, slice the string accordingly
  return hexString.slice(0, length);
};
