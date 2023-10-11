/*
  Warnings:

  - You are about to drop the column `studenId` on the `student_enrolled_courses` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `student_enrolled_courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "student_enrolled_courses" DROP CONSTRAINT "student_enrolled_courses_studenId_fkey";

-- AlterTable
ALTER TABLE "student_enrolled_courses" DROP COLUMN "studenId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "student_enrolled_courses" ADD CONSTRAINT "student_enrolled_courses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
