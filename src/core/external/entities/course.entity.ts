import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InternalCourse } from '@dad-group-1/backend-common';
import { Program } from './program.entity';
import { Instructor } from './instructor.entity';
import { Room } from './room.entity';
import { Schedule } from '../../schedules/entities/schedule.entity';

@Entity()
export class Course extends InternalCourse {
  @ManyToOne(() => Program, (program) => program.courses)
  program: Program;
  @OneToMany(() => Schedule, (schedule) => schedule.course)
  schedules: Schedule[];
  @ManyToOne(() => Instructor, (instructor) => instructor.courses)
  instructor: Instructor;
  @ManyToOne(() => Room, (room) => room.courses)
  room: Room;
}
