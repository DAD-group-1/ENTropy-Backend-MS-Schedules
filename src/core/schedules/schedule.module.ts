import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Course } from '../external/entities/course.entity';
import { Program } from '../external/entities/program.entity';
import { ProgramType } from '../external/entities/program-type.entity';
import { Instructor } from '../external/entities/instructor.entity';
import { User } from '../external/entities/user.entity';
import { Campus } from '../external/entities/campus.entity';
import { Building } from '../external/entities/building.entity';
import { Room } from '../external/entities/room.entity';
import { RoomType } from '../external/entities/room-type.entity';
import { Specialization } from '../external/entities/specialization.entity';
import { Department } from '../external/entities/department.entity';
import { Role } from '../external/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule,
      Course,
      Program,
      ProgramType,
      Instructor,
      User,
      Campus,
      Building,
      Room,
      RoomType,
      Specialization,
      Department,
      Role,
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
