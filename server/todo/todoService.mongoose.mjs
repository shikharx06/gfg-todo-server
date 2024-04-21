import { Todo } from './todo.model.mjs';

export const addTodo = async ({ title, description }) => {
  //   if (!title || !description)
  //     throw new Error('title or description is missing');

  const todo = new Todo();
  todo.title = title;
  todo.description = description;
  await todo.save();
};

export const getAllTodos = async (limit = 10) => {
  if (typeof limit === 'string') {
    limit = parseInt(limit);
    console.log(typeof limit);
    if (isNaN(limit)) throw new Error('limit should be a valid integer');
  }

  return await Todo.find({}).limit(limit);
};

export const getTodoById = async (id) => {
  return await Todo.findById(id);
};
