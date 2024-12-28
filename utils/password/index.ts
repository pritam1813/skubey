import { argon2id } from 'hash-wasm';

// Configuration constants
const MEMORY_COST = 65536; // 64MB
const TIME_COST = 3;
const PARALLELISM = 4;
const HASH_LENGTH = 32;
const SALT_LENGTH = 16;

export async function hashPassword(password: string): Promise<string> {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  
  // Hash the password using Argon2id (recommended for password hashing)
  const hash = await argon2id({
    password: new TextEncoder().encode(password),
    salt,
    parallelism: PARALLELISM,
    iterations: TIME_COST,
    memorySize: MEMORY_COST,
    hashLength: HASH_LENGTH,
  });

  // Combine salt and hash for storage
  // Format: base64(salt).base64(hash)
  const saltString = Buffer.from(salt).toString('base64');
  return `${saltString}.${hash}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    // Split the stored hash into salt and hash components
    const [saltString, hashString] = storedHash.split('.');
    const salt = Buffer.from(saltString, 'base64');

    // Compute hash with same parameters
    const computedHash = await argon2id({
      password: new TextEncoder().encode(password),
      salt,
      parallelism: PARALLELISM,
      iterations: TIME_COST,
      memorySize: MEMORY_COST,
      hashLength: HASH_LENGTH,
    });

    // Compare computed hash with stored hash
    return computedHash === hashString;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}