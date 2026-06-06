import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { InternalInstructor } from '@dad-group-1/backend-common';
import { User } from './user.entity';
import { Department } from './department.entity';
import { Specialization } from './specialization.entity';
import { Course } from './course.entity';
import { Schedule } from '../../schedules/entities/schedule.entity';

@Entity()
export class Instructor extends InternalInstructor {
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Department, (department) => department.instructors)
  @JoinColumn({ name: 'department_id' })
  department: Department;
  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];
  @ManyToOne(
    () => Specialization,
    (specialization) => specialization.instructors,
  )
  @JoinColumn({ name: 'specialization_id' })
  specialization: Specialization;
  @OneToOne(() => Schedule, (schedule) => schedule.instructor)
  schedule: Schedule;
}
