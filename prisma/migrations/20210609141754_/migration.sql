-- AlterTable
ALTER TABLE "LoksewaMockCategory" ALTER COLUMN "negativeMarkingRatio" DROP NOT NULL,
ALTER COLUMN "negativeMarkingRatio" SET DEFAULT 0,
ALTER COLUMN "totalMins" DROP NOT NULL,
ALTER COLUMN "totalMins" SET DEFAULT 90;
