import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { WorkTaskService } from './work-task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { fillObject } from '@task-force/core';
import { TaskRdo } from './rdo/task.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@Controller('task')
export class WorkTaskController {
  constructor(
    private readonly workTaskService: WorkTaskService
  ) {
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new task has been successfully created'
  })
  public async create(@Body() dto: CreateTaskDto) {
    const task = await this.workTaskService.create(dto)
    return fillObject(TaskRdo, task);
  }

  @Get()
  @ApiResponse({
    type: [TaskRdo],
    status: HttpStatus.OK,
    description: 'The list of tasks is found'
  })
  public async showAll() {
    const tasks = await this.workTaskService.getAll();
    return tasks.map((task) => fillObject(TaskRdo, task));
  }

  @Get(':id')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task is found'
  })
  public async show(@Param('id') id: string) {
    const task = await this.workTaskService.getOne(id);
    return fillObject(TaskRdo, task)
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task was deleted'
  })
  public async delete(@Param('id') id: string) {
    await this.workTaskService.delete(id);
  }
}
