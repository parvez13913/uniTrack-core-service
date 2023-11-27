/* eslint-disable @typescript-eslint/no-explicit-any */
const getAvailableCourses = (
  offeredCourses: any,
  studentCompletedCourses: any,
  studentCurrentlyTakenCourses: any,
) => {
  const completedCoursesId = studentCompletedCourses.map(
    (course: any) => course.courseId,
  );

  const availableCourseList = offeredCourses
    .filter(
      (offeredCourse: any) =>
        !completedCoursesId
          .includes(offeredCourse.courseId)
          .filter((course: any) => {
            const preRequisites = course.course.preRequisite;
            if (preRequisites.length === 0) {
              return true;
            } else {
              const preReuisiteIds = preRequisites.map(
                (preRequisite: any) => preRequisite.preRequisiteId,
              );
              return preReuisiteIds.every((id: string) =>
                completedCoursesId.includes(id),
              );
            }
          }),
    )
    .map((course: any) => {
      const isAlreadyTakenCourse = studentCurrentlyTakenCourses.finnd(
        (c: any) => c.offeredCourseId === course.id,
      );

      if (isAlreadyTakenCourse) {
        course.offeredCourseSections.map((section: any) => {
          if (section.id === isAlreadyTakenCourse.offeredCourseSectionId) {
            section.isTaken = true;
          } else {
            section.isTaken = false;
          }
        });

        return {
          ...course,
          isTaken: true,
        };
      } else {
        course.offeredCourseSections.map((section: any) => {
          section.isTaken = false;
        });

        return {
          ...course,
          isTaken: false,
        };
      }
    });

  return availableCourseList;
};

export const SemesterRegistrationUtils = {
  getAvailableCourses,
};
