const getGradeFromMarks = async (marks: number) => {
  let result = {
    grade: '',
  };
  if (marks >= 0 && marks <= 39) {
    result = {
      grade: 'F',
    };
  } else if (marks >= 40 && marks <= 50) {
    result = {
      grade: 'D',
    };
  } else if (marks >= 51 && marks <= 60) {
    result = {
      grade: 'C',
    };
  } else if (marks >= 61 && marks <= 70) {
    result = {
      grade: 'B',
    };
  } else if (marks >= 71 && marks <= 80) {
    result = {
      grade: 'A',
    };
  } else if (marks >= 81 && marks <= 100) {
    result = {
      grade: 'A+',
    };
  }

  return result;
};

export const StudentEnrolledCourseMarksUtils = {
  getGradeFromMarks,
};
