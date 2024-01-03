import initFacultyEvents from '../modules/faculty/faculty.events';
import initStudentEvents from '../modules/student/student.events';

const subcribeToEvents = () => {
  initStudentEvents();
  initFacultyEvents();
};

export default subcribeToEvents;
