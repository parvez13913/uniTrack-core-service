export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  prerequisiteCourses: {
    courseId: string;
    isDeleted?: null;
  }[];
};

export type ICourseFilters = {
  searchTerm?: string;
};
