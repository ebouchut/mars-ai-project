-- Create the databases for the marsAI project and the database user
-- Replace the database names, username and password according to your current configuration
-- This should be in sync with .env.

CREATE DATABASE IF NOT EXISTS marsai                          DEFAULT CHARACTER SET utf8mb4;
CREATE DATABASE IF NOT EXISTS prisma_migrate_shadow_db_marsai DEFAULT CHARACTER SET utf8mb4;

CREATE USER IF NOT EXISTS marsai@localhost IDENTIFIED BY 'TODO_PASSWORD_HERE';


GRANT ALL PRIVILEGES ON marsai.*                          TO marsai@localhost;
-- See: https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database
GRANT ALL PRIVILEGES ON prisma_migrate_shadow_db_marsai.* TO marsai@localhost;
GRANT CREATE, DROP   ON *.*                               TO marsai@localhost;
FLUSH PRIVILEGES;

