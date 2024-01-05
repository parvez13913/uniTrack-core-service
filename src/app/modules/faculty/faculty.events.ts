import { RedisClient } from '../../../shared/redis';
import {
  EVENT_FACULTY_CREATED,
  EVENT_FACULTY_UPDATED,
} from './faculty.constants';
import { FacultyService } from './faculty.service';

const initFacultyEvents = () => {
  // Create
  RedisClient.subscribe(EVENT_FACULTY_CREATED, async (event: string) => {
    const data = JSON.parse(event);
    await FacultyService.createFacultyFromEvent(data);
  });

  // Update
  RedisClient.subscribe(EVENT_FACULTY_UPDATED, async (event: string) => {
    const data = JSON.parse(event);
    await FacultyService.updateFacultyFromEvent(data);
  });
};

export default initFacultyEvents;
