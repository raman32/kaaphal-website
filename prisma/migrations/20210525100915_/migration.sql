/*
  Warnings:

  - Changed the type of `type` on the `Advertisement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AdvertisementType" AS ENUM ('banner', 'post', 'splash', 'feed');

-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "type",
ADD COLUMN     "type" "AdvertisementType" NOT NULL;

-- DropEnum
DROP TYPE "AdvertisementTye";
