import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTodoDto) {
    return this.prisma.todo.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: number, data: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return this.prisma.todo.delete({ where: { id } });
  }
}
