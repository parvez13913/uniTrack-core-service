-- CreateEnum
CREATE TYPE "StudentEnrolledCourseStatus" AS ENUM ('ONGOING', 'COMPLETED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "student_enrolled_courses" (
    "id" TEXT NOT NULL,
    "studenId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "point" DOUBLE PRECISION DEFAULT 0,
    "totalMarks" INTEGER DEFAULT 0,
    "status" "StudentEnrolledCourseStatus" DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_enrolled_courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_enrolled_courses" ADD CONSTRAINT "student_enrolled_courses_studenId_fkey" FOREIGN KEY ("studenId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enrolled_courses" ADD CONSTRAINT "student_enrolled_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enrolled_courses" ADD CONSTRAINT "student_enrolled_courses_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "acamemic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
