import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { InternalSchedule } from '@dad-group-1/backend-common';
import { Course } from '../../external/entities/course.entity';
import { Instructor } from '../../external/entities/instructor.entity';
import { Room } from '../../external/entities/room.entity';

@Entity()
export class Schedule extends InternalSchedule {
  @ManyToOne(() => Course, (course) => course.schedules)
  course: Course;
  @OneToOne(() => Instructor, (instructor) => instructor.schedule)
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;
  @ManyToOne(() => Room, (room) => room.schedules)
  room: Room;
}
