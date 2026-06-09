import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import {
  CreateScheduleRequestDto,
  PaginationQueryDto,
  ScheduleListResponseDto,
  ScheduleResponseDto,
  SearchPaginationQueryDto,
  TemporalSearchQueryDto,
  UpdateScheduleRequestDto,
} from '@dad-group-1/backend-common';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(
    createData: CreateScheduleRequestDto,
  ): Promise<ScheduleResponseDto> {
    const schedule = this.scheduleRepository.create({ ...createData });
    try {
      return await this.scheduleRepository.save(schedule);
    } catch (error) {
      this.logger.error(
        `${error.constructor.name}: Failed to create schedule record - ${error.message}`,
        error.stack,
      );
      throw new RpcException({
        message: `Failed to create schedule record`,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: PaginationQueryDto): Promise<ScheduleListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.scheduleRepository.findAndCount({
      relations: { instructor: true, course: true },
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new ScheduleListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<ScheduleResponseDto | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: id },
      relations: { instructor: true },
    });

    if (!schedule) {
      throw new RpcException({
        message: `Schedule with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return schedule;
  }

  async findAllByProgram(query: SearchPaginationQueryDto) {
    const { page, limit } = query.query;
    const skip = (page - 1) * limit;

    const [data] = await this.scheduleRepository.findAndCount({
      relations: { instructor: true, course: true },
      skip,
      take: limit,
      order: { id: 'DESC' },
      where: { course: { program_id: query.id } },
    });

    return data;
  }

  async findAllByProgramBetweenDates(query: TemporalSearchQueryDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    const results = await this.scheduleRepository.find({
      order: { id: 'DESC' },
      relations: { course: true },
      where: {
        course: { program_id: query.id },
        start_date: MoreThanOrEqual(startDate),
        end_date: LessThanOrEqual(endDate),
      },
    });
    return results;
  }

  async findAllByInstructorBetweenDates(query: TemporalSearchQueryDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    const results = await this.scheduleRepository.find({
      order: { id: 'DESC' },
      where: {
        instructor: { user_id: query.id },
        start_date: MoreThanOrEqual(startDate),
        end_date: LessThanOrEqual(endDate),
      },
    });
    return results;
  }

  async update(
    id: number,
    updateData: UpdateScheduleRequestDto,
  ): Promise<ScheduleResponseDto | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: id },
    });
    if (!schedule) {
      this.logger.error(`Schedule with ID ${id} not found for update`);
      throw new RpcException({
        message: `Schedule with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.scheduleRepository.merge(schedule, updateData);
    return await this.scheduleRepository.save(schedule);
  }

  async remove(id: number): Promise<ScheduleResponseDto | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: id },
    });
    if (!schedule) {
      this.logger.error(`Schedule with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Schedule with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.scheduleRepository.remove(schedule);
    return schedule;
  }
}
