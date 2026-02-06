import { argon2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const argon2Async = promisify(argon2);

// OWASP first-choice Argon2id parameters
// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const ALGORITHM = "argon2id";
const SALT_LENGTH = 16;
const PARALLELISM = 1;
const MEMORY = 47104; // 46 MiB
const PASSES = 1;
const TAG_LENGTH = 32;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);

  const hash = await argon2Async(ALGORITHM, {
    message: password,
    nonce: salt,
    parallelism: PARALLELISM,
    memory: MEMORY,
    passes: PASSES,
    tagLength: TAG_LENGTH,
  });

  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, "hex");
  const storedHash = Buffer.from(hashHex, "hex");

  const hash = await argon2Async(ALGORITHM, {
    message: password,
    nonce: salt,
    parallelism: PARALLELISM,
    memory: MEMORY,
    passes: PASSES,
    tagLength: TAG_LENGTH,
  });

  return timingSafeEqual(hash, storedHash);
}
