import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient, UserRole } from "../src/generated/prisma/client.js"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
    adapter,
});

const admins = [
    {
        email: "admin@marsai.example.com",
        passwordHash: "TODO_HASH_HERE",
        role: UserRole.admin,
        firstName: "Admin1",
        lastName: "Admin",
    }
];

async function main() {
    for (const admin of admins) {
        await prisma.user.create({ data: admin });
    }
    console.log(`Seeded ${admins.length} admins`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
