export type ISemesterRegistrationsFilters = {
  searchTerm?: string | undefined;
  academicSemesterId?: string | undefined;
};

export type IEnrollCourse = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};
