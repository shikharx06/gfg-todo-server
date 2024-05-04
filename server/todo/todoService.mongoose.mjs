import { NotFoundError } from './todo.exception.mjs';
import { Todo } from './todo.model.mjs';

export const addTodo = async ({ title, description }) => {
  //   if (!title || !description)
  //     throw new Error('title or description is missing');

  const todo = new Todo();
  todo.title = title;
  todo.description = description;
  await todo.save();
};

export const getAllTodos = async (userId, limit = 10) => {
  if (typeof limit === 'string') {
    limit = parseInt(limit);
    // console.log(typeof limit);
    if (isNaN(limit)) throw new Error('limit should be a valid integer');
  }

  const availableTodos = await Todo.find({ createdBy: userId }).limit(limit);
  return availableTodos;
};

export const getTodoById = async (id) => {
  return await Todo.findById(id);
};

export const updateTodo = async (id, userId, data) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { ...data },
    {
      returnDocument: 'after',
    }
  );

  if (!todo) throw new NotFoundError('Todo not found.');
};
