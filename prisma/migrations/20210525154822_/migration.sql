/*
  Warnings:

  - The values [langugage] on the enum `ScholarshipLevel` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `type` to the `Flag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FlagType" AS ENUM ('fakenews', 'politicalcontent', 'religiouscontent', 'sexualcontent', 'slander', 'outdated', 'other');

-- CreateEnum
CREATE TYPE "FlagStatus" AS ENUM ('submitted', 'inreview', 'solved');

-- AlterEnum
BEGIN;
CREATE TYPE "ScholarshipLevel_new" AS ENUM ('language', 'training', 'research', 'k12', 'bachelors', 'masters', 'phd', 'postgrad');
ALTER TABLE "Scholarship" ALTER COLUMN "level" TYPE "ScholarshipLevel_new" USING ("level"::text::"ScholarshipLevel_new");
ALTER TYPE "ScholarshipLevel" RENAME TO "ScholarshipLevel_old";
ALTER TYPE "ScholarshipLevel_new" RENAME TO "ScholarshipLevel";
DROP TYPE "ScholarshipLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Flag" ADD COLUMN     "message" TEXT,
ADD COLUMN     "status" "FlagStatus" NOT NULL DEFAULT E'submitted',
ADD COLUMN     "type" "FlagType" NOT NULL;

-- AlterTable
ALTER TABLE "LoksewaQuestionCategory" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "language" "Language" NOT NULL DEFAULT E'en';
