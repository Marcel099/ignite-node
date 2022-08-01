/*
  Warnings:

  - You are about to drop the column `fk_id_teacher` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `teachersId` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the `authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_teachersId_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_coursesId_fkey";

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "fk_id_teacher",
DROP COLUMN "teachersId";

-- DropTable
DROP TABLE "authors";

-- DropTable
DROP TABLE "teachers";
