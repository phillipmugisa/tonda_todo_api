import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { PrismaService } from 'src/prisma/prisma.service';

const mockTodo = {
  id: 1,
  title: 'Test Todo',
  description: 'This is a test todo',
  isCompleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaService = {
  todo: {
    create: jest.fn().mockResolvedValue(mockTodo),
    findMany: jest.fn().mockResolvedValue([mockTodo]),
    findUnique: jest.fn().mockResolvedValue(mockTodo),
    update: jest.fn().mockResolvedValue(mockTodo),
    delete: jest.fn().mockResolvedValue(mockTodo),
  },
};

describe('TodosService', () => {
  let service: TodosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const result = await service.create({ title: 'Test Todo', description: 'This is a test todo' });
    expect(result).toEqual(mockTodo);
    expect(prisma.todo.create).toHaveBeenCalledWith({
      data: { title: 'Test Todo', description: 'This is a test todo' },
    });
  });

  it('should find all todos', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockTodo]);
    expect(prisma.todo.findMany).toHaveBeenCalled();
  });

  it('should find a todo by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockTodo);
    expect(prisma.todo.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
