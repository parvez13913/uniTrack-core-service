import { Course, StudentEnrolledCourse } from '@prisma/client';

const getGradeFromMarks = async (marks: number) => {
  let result = {
    grade: '',
    point: 0,
  };
  if (marks >= 0 && marks <= 39) {
    result = {
      grade: 'F',
      point: 0,
    };
  } else if (marks >= 40 && marks <= 50) {
    result = {
      grade: 'D',
      point: 2.0,
    };
  } else if (marks >= 51 && marks <= 60) {
    result = {
      grade: 'C',
      point: 2.5,
    };
  } else if (marks >= 61 && marks <= 70) {
    result = {
      grade: 'B',
      point: 3.0,
    };
  } else if (marks >= 71 && marks <= 80) {
    result = {
      grade: 'A',
      point: 3.5,
    };
  } else if (marks >= 81 && marks <= 100) {
    result = {
      grade: 'A+',
      point: 4.0,
    };
  }

  return result;
};

const calcCGPAandGrade = (
  payload: (StudentEnrolledCourse & { course: Course })[],
) => {
  if (payload.length === 0) {
    return {
      totalCompletedCredit: 0,
      cgpa: 0,
    };
  }

  let totalCredit = 0;
  let totalCGPA = 0;

  for (const grade of payload) {
    totalCGPA += grade?.point || 0;
    totalCredit += grade?.course?.credits || 0;
  }

  const avgCGPA = Number((totalCGPA / payload.length).toFixed(2));

  return {
    totalCompletedCredit: totalCredit,
    cgpa: avgCGPA,
  };
};

export const StudentEnrolledCourseMarksUtils = {
  getGradeFromMarks,
  calcCGPAandGrade,
};
