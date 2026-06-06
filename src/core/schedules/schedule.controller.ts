import { Controller, Logger } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateScheduleRequestDto,
  PaginationQueryDto,
  UpdateScheduleRequestDto,
} from '@dad-group-1/backend-common';

@Controller('schedules')
export class ScheduleController {
  private readonly logger = new Logger(ScheduleController.name);
  constructor(private readonly scheduleService: ScheduleService) {}

  @MessagePattern({ cmd: 'create_schedule' })
  async create(@Payload() data: CreateScheduleRequestDto) {
    return this.scheduleService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_schedules' })
  findAll(query: PaginationQueryDto) {
    return this.scheduleService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_schedule' })
  findOne(@Payload() id: number) {
    return this.scheduleService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_schedule' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateScheduleRequestDto;
    },
  ) {
    return this.scheduleService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_schedule' })
  remove(@Payload() id: number) {
    return this.scheduleService.remove(id);
  }
}
