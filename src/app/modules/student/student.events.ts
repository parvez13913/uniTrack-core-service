import { RedisClient } from '../../../shared/redis';
import { EVENT_STUDENT_CREATED } from './student.constants';
import { StudentService } from './student.service';

const initStudentEvents = () => {
  RedisClient.subscribe(EVENT_STUDENT_CREATED, async (event: string) => {
    const data = JSON.parse(event);
    await StudentService.createStudentFromEvent(data);
  });
};

export default initStudentEvents;
