import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InternalRoom } from '@dad-group-1/backend-common';
import { Building } from './building.entity';
import { Campus } from './campus.entity';
import { RoomType } from './room-type.entity';
import { Course } from './course.entity';
import { Schedule } from '../../schedules/entities/schedule.entity';

@Entity()
export class Room extends InternalRoom {
  @ManyToOne(() => Building, (building) => building.rooms)
  building: Building;
  @OneToMany(() => Course, (course) => course.room)
  courses: Course[];
  @ManyToOne(() => Campus, (campus) => campus.rooms)
  campus: Campus;
  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  roomType: RoomType;
  @OneToMany(() => Schedule, (schedule) => schedule.room)
  schedules: Schedule[];
}
