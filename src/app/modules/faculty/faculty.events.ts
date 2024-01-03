import { RedisClient } from '../../../shared/redis';
import { EVENT_FACULTY_CREATED } from './faculty.constants';
import { FacultyService } from './faculty.service';

const initFacultyEvents = () => {
  RedisClient.subscribe(EVENT_FACULTY_CREATED, async (event: string) => {
    const data = JSON.parse(event);
    await FacultyService.createFacultyFromEvent(data);
  });
};

export default initFacultyEvents;
