import { Router } from 'express';
// import { addTodo, getAllTodos, getTodoById } from './todoService.mjs';
import { addTodo, getAllTodos, getTodoById } from './todoService.mongoose.mjs';
import { formatResponse } from '../utils/formatResponse.mjs';

export const todoRouter = Router();

// fetch all todos
todoRouter.get('/', async (req, res) => {
  // limit is a string
  const limit = req.query.limit;
  console.log(limit);
  const todos = await getAllTodos(req.query.limit);

  res.send(formatResponse('TODOS FETCHED.', todos));
});

// get specific todo details
todoRouter.get('/:id', async (req, res) => {
  const todo = await getTodoById(req.params.id);

  res.send(
    formatResponse('TODO FETCHED.', {
      todo,
    })
  );
});

// create a todo
todoRouter.post('/', async (req, res) => {
  const { title, description } = req.body;
  await addTodo({ title, description });
  res.send(formatResponse('TODO CREATED SUCCESSFULLY.'));
});

// TODO: complete rest of the methods yourself.
// update a todo
todoRouter.put('/:id', (req, res) => {});

// delete a todo
todoRouter.delete('/:id', (req, res) => {});
