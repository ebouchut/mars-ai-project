/**
 * Retrieves a required environment variable by name.
 * Throws an error at startup if the variable is missing or empty,
 * preventing the application from running with incomplete configuration.
 *
 * @param name - The name of the environment variable to retrieve.
 * @returns The value of the environment variable.
 * @throws {Error} If the environment variable is not set or is empty.
 */
export function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}
