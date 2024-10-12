import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

const mockTodo = {
  id: 1,
  title: 'Test Todo',
  description: 'This is a test todo',
  isCompleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockTodosService = {
  create: jest.fn().mockResolvedValue(mockTodo),
  findAll: jest.fn().mockResolvedValue([mockTodo]),
  findOne: jest.fn().mockResolvedValue(mockTodo),
  update: jest.fn().mockResolvedValue(mockTodo),
  remove: jest.fn().mockResolvedValue(mockTodo),
};

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        { provide: TodosService, useValue: mockTodosService },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo', async () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test Todo',
      description: 'This is a test todo',
    };
    const result = await controller.create(createTodoDto);
    expect(result).toEqual(mockTodo);
    expect(service.create).toHaveBeenCalledWith(createTodoDto);
  });

  it('should return an array of todos', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockTodo]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single todo', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockTodo);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a todo', async () => {
    const updateTodoDto: UpdateTodoDto = { title: 'Updated Todo' };
    const result = await controller.update(1, updateTodoDto);
    expect(result).toEqual(mockTodo);
    expect(service.update).toHaveBeenCalledWith(1, updateTodoDto);
  });

  it('should delete a todo', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual(mockTodo);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
