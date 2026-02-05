import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "./generated/prisma/client.js"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
    adapter,
});

const admins = [
    {
        email: "alice@marsai.io",
        passwordHash: "TODO_HASH_HERE",
        firstName: "Alice",
        lastName: "Dupont",
    },
    {
        email: "bob@marsai.io",
        passwordHash: "TODO_HASH_HERE",
        firstName: "Bob",
        lastName: "Martin",
    },
];

async function main() {
    for (const admin of admins) {
        await prisma.admin.create({ data: admin });
    }
    console.log(`Seeded ${admins.length} admins`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
