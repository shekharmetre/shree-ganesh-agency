import bcrypt from 'bcryptjs'
import CryptoJS from "crypto-js";
interface HashPasswordProps {
  code: string; // should be a string (password)
  saltRounds?: number; // Optional, default to 10
}
export const hashPassword = async ({
  code,
  saltRounds = 10,
}: HashPasswordProps): Promise<string> => {
  try {
    // Hash the auto-generated password (should already be a string)
    const hash = await bcrypt.hash(code, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err; // Re-throw error to handle it outside
  }
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch; // returns true if passwords match, false otherwise
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err; // Re-throw error to handle it outside
  }
};


export function isExpired(expiryTimestamp: string): boolean {
  const expiresAtUTC = new Date(expiryTimestamp);
  return new Date() > expiresAtUTC;
}






