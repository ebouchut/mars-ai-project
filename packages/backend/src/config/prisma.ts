import "dotenv/config";
import { PrismaClient }  from "@marsai/database/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import {requireEnv}      from "@/config/environment.js";


const DATABASE_URL: string = requireEnv("DATABASE_URL");
const adapter = new PrismaMariaDb(DATABASE_URL!);

/**
 * The Prisma ORM client (singleton) used to access models and navigate relationships.
 * @see {@link https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction#importing-prisma-client | Prisma Client Documentation}
 */
const prisma = new PrismaClient({
    adapter,
});

export default prisma;
