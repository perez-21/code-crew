/*
  Warnings:

  - You are about to drop the column `projectId` on the `Application` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_projectId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "assignee" DROP NOT NULL;
