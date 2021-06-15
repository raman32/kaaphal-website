/*
  Warnings:

  - The primary key for the `Follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Follow` table. All the data in the column will be lost.
  - The primary key for the `Reaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Reaction` table. All the data in the column will be lost.
  - Made the column `userId` on table `Follow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followingId` on table `Follow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `Reaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Reaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_pkey",
DROP COLUMN "id",
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "followingId" SET NOT NULL,
ADD PRIMARY KEY ("userId", "followingId");

-- AlterTable
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_pkey",
DROP COLUMN "id",
ALTER COLUMN "postId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ADD PRIMARY KEY ("postId", "userId");
