import { Controller, Logger } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateScheduleRequestDto,
  PaginationQueryDto,
  SearchPaginationQueryDto,
  TemporalSearchQueryDto,
  UpdateScheduleRequestDto,
} from '@dad-group-1/backend-common';

@Controller('schedules')
export class ScheduleController {
  private readonly logger = new Logger(ScheduleController.name);
  constructor(private readonly scheduleService: ScheduleService) {}

  @MessagePattern({ cmd: 'create_schedule' })
  async create(@Payload() data: CreateScheduleRequestDto) {
    this.logger.log('Received create schedule record');
    return this.scheduleService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_schedules' })
  findAll(query: PaginationQueryDto) {
    this.logger.log('Received find all schedules request');
    return this.scheduleService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_schedule' })
  findOne(@Payload() id: number) {
    this.logger.log('Received find one schedule request');
    return this.scheduleService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_schedules_by_program' })
  findAllByProgram(@Payload() query: SearchPaginationQueryDto) {
    this.logger.log('Received find schedules by program request');
    return this.scheduleService.findAllByProgram(query);
  }

  @MessagePattern({ cmd: 'find_schedules_by_program_between_dates' })
  findAllBetweenDates(@Payload() query: TemporalSearchQueryDto) {
    this.logger.log('Received find schedules by program between dates request');
    return this.scheduleService.findAllByProgramBetweenDates(query);
  }

  @MessagePattern({ cmd: 'find_schedules_by_instructor_between_dates' })
  findAllByInstructorBetweenDates(@Payload() query: TemporalSearchQueryDto) {
    this.logger.log(
      'Received find schedules by instructor between dates request',
    );
    return this.scheduleService.findAllByInstructorBetweenDates(query);
  }

  @MessagePattern({ cmd: 'update_schedule' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateScheduleRequestDto;
    },
  ) {
    this.logger.log('Received update schedule request');
    return this.scheduleService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_schedule' })
  remove(@Payload() id: number) {
    this.logger.log('Received remove schedule request');
    return this.scheduleService.remove(id);
  }
}
