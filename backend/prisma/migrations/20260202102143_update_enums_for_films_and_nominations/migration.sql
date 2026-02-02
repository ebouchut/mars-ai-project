/*
  Warnings:

  - You are about to alter the column `status` on the `nominations` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(3))`.
  - The values [pending_consensus] on the enum `screenings_status` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `status` on table `films` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `films` MODIFY `status` ENUM('submitted', 'bookended', 'draft_published', 'copyright_cleared', 'copyright_flagged', 'screenable', 'screened', 'pending_selection_consensus', 'selected', 'duration_exceeded', 'rejected', 'categorized', 'in_competation', 'scored') NOT NULL;

-- AlterTable
ALTER TABLE `nominations` MODIFY `status` ENUM('nominated', 'winner', 'runner_up', 'pending_tiebreak_consensus') NOT NULL;

-- AlterTable
ALTER TABLE `screenings` MODIFY `status` ENUM('selected', 'rejected', 'pending_selection_consensus') NOT NULL;
