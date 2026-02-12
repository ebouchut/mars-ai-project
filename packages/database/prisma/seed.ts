import "dotenv/config";
import { argon2, randomBytes } from "node:crypto";
import { promisify } from "node:util";
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient, UserRole } from "../src/generated/prisma/client.js"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
    adapter,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Hash password using Argon2id (OWASP recommended parameters)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const argon2Async = promisify(argon2);

async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16); // 128-bit salt

    const hash = await argon2Async("argon2id", {
        message: password,
        nonce: salt,
        parallelism: 1,
        memory: 47104, // 46 MiB
        passes: 1,
        tagLength: 32, // 256-bit hash
    });

    return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

const admins = [
    {
        email: "admin@marsai.example.com",
        passwordHash: "TODO:TODO",
        role: UserRole.admin,
        firstName: "Admin1",
        lastName: "Admin",
    }
];

async function main() {
    for (const admin of admins) {
        const hashedPassword = await hashPassword(admin.passwordHash);
        await prisma.user.create({
            data: {
                ...admin,
                passwordHash: hashedPassword
            }
        });
    }
    console.log(`Seeded ${admins.length} admins`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
