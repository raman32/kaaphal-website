/*
  Warnings:

  - Added the required column `negativeMarkingRatio` to the `LoksewaMockCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMins` to the `LoksewaMockCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "MockSetType" ADD VALUE 'trial';

-- AlterTable
ALTER TABLE "LoksewaMockCategory" ADD COLUMN     "negativeMarkingRatio" INTEGER NOT NULL,
ADD COLUMN     "totalMins" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LoksewaMockSet" ALTER COLUMN "type" SET DEFAULT E'free';

-- AlterTable
ALTER TABLE "LoksewaQuestion" ADD COLUMN     "showInMCQ" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Scholarship" ALTER COLUMN "startsAt" DROP NOT NULL,
ALTER COLUMN "deadlineAt" DROP NOT NULL;
