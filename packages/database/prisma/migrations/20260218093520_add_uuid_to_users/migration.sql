/*
  Warnings:

  - The required column `uuid` was added to the `users` table with a prisma-level default value.
    This is not possible if the table is not empty.
    Please add this column as optional, then populate it before making it required.
*/

-- Step 1: Add the column as nullable to avoid implicit default values on existing rows
ALTER TABLE `users` ADD COLUMN `uuid` CHAR(36) NULL;

-- Step 2: Backfill distinct UUIDs for existing rows
UPDATE `users` SET `uuid` = UUID() WHERE `uuid` IS NULL;

-- Step 3: Make the column NOT NULL now that all rows have a value
ALTER TABLE `users` MODIFY `uuid` CHAR(36) NOT NULL;

-- Step 4: Create a UNIQUE index on the populated, non-null UUID column
CREATE UNIQUE INDEX `users_uuid_key` ON `users`(`uuid`);
