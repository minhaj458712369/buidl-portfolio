import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const AUTH_FILE = path.join(process.cwd(), "src", "data", "auth.json");
const COOKIE_NAME = "minhazul_admin_session";
const SIGNING_SALT = "minhazul-portfolio-secure-salt-2026";

export type AuthConfig = {
  username: string;
  passwordHash: string;
};

export async function getAuthConfig(): Promise<AuthConfig> {
  try {
    const raw = await fs.readFile(AUTH_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      username: parsed.username || "mz",
      passwordHash: parsed.passwordHash || parsed.password || "",
    };
  } catch {
    const defaultConfig: AuthConfig = {
      username: "mz",
      passwordHash: "password123",
    };
    return defaultConfig;
  }
}

export async function saveAuthConfig(config: AuthConfig): Promise<void> {
  const cleanData = {
    username: config.username,
    passwordHash: config.passwordHash,
  };
  await fs.writeFile(AUTH_FILE, JSON.stringify(cleanData, null, 2), "utf-8");
}

function verifyPassword(input: string, storedHash: string): boolean {
  if (!storedHash || !input) return false;

  // 1. Direct plaintext match
  if (input === storedHash) return true;

  // 2. ASP.NET Core Identity v3 (PBKDF2 base64 starting with AQAAAA...)
  if (storedHash.startsWith("AQAAAA")) {
    try {
      const b = Buffer.from(storedHash, "base64");
      if (b.length > 13 && b[0] === 1) {
        const prf = b.readUInt32BE(1);
        const iterCount = b.readUInt32BE(5);
        const saltLength = b.readUInt32BE(9);
        const salt = b.subarray(13, 13 + saltLength);
        const expectedSubkey = b.subarray(13 + saltLength);

        // Try algorithms based on PRF value and fallbacks
        const algos = prf === 2 ? ["sha512", "sha256"] : ["sha256", "sha512", "sha1"];
        for (const algo of algos) {
          try {
            const actualSubkey = crypto.pbkdf2Sync(
              input,
              salt,
              iterCount,
              expectedSubkey.length,
              algo
            );
            if (crypto.timingSafeEqual(expectedSubkey, actualSubkey)) {
              return true;
            }
          } catch {
            // try next
          }
        }
      }
    } catch (e) {
      console.warn("PBKDF2 verification error:", e);
    }
  }

  // 3. Bcrypt hash ($2a$, $2b$, $2y$)
  if (
    storedHash.startsWith("$2a$") ||
    storedHash.startsWith("$2b$") ||
    storedHash.startsWith("$2y$")
  ) {
    try {
      if (bcrypt.compareSync(input, storedHash)) return true;
    } catch {
      // ignore
    }
  }

  // 4. SHA-256 hash
  try {
    const sha = crypto.createHash("sha256").update(input).digest("hex");
    if (sha.toLowerCase() === storedHash.toLowerCase()) return true;
  } catch {
    // ignore
  }

  return false;
}

// Generate stateless HMAC-signed token
function createSignedToken(username: string, passwordHash: string): string {
  const payload = {
    user: username,
    iat: Date.now(),
    exp: Date.now() + 1000 * 60 * 60 * 24 * 14, // 14 days validity
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const secret = `${passwordHash}:${SIGNING_SALT}`;
  const signature = crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${signature}`;
}

export async function authenticate(usernameInput: string, passwordInput: string): Promise<string | null> {
  const config = await getAuthConfig();
  const inputUser = usernameInput.trim().toLowerCase();
  const validUser = config.username.trim().toLowerCase();

  const isUserMatch =
    inputUser === validUser ||
    inputUser === "admin" ||
    inputUser === "arefinminhazul@gmail.com";

  if (!isUserMatch) {
    return null;
  }

  const isPassMatch = verifyPassword(passwordInput, config.passwordHash);
  if (!isPassMatch) {
    return null;
  }

  // Return signed stateless token
  return createSignedToken(config.username, config.passwordHash);
}

export async function verifyToken(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payloadB64, signature] = parts;

    const config = await getAuthConfig();
    const secret = `${config.passwordHash}:${SIGNING_SALT}`;
    const expectedSig = crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");

    if (signature !== expectedSig) return false;

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8"));
    if (!payload.exp || Date.now() > payload.exp) {
      return false; // expired
    }
    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

export async function invalidateSession(_token: string | null | undefined): Promise<void> {
  // Stateless: cookie is deleted on logout
}

export async function updatePassword(newPassword: string): Promise<void> {
  const config = await getAuthConfig();
  const salt = bcrypt.genSaltSync(12);
  config.passwordHash = bcrypt.hashSync(newPassword, salt);
  await saveAuthConfig(config);
}

export { COOKIE_NAME };
