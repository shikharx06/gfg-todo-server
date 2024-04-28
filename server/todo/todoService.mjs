import { ObjectId } from 'mongodb';
import db from '../db/conn.mjs';

export const addTodo = async ({ title, description }) => {
  if (!title || !description)
    throw new Error('Both title and description should be present.');

  // get todo collection
  const todoCollection = db.collection('todos');

  // add title and description
  const response = await todoCollection.insertOne({ title, description });
  // console.log(response);
};

export const getAllTodos = async (limit = 10) => {
  // console.log('getALLTODOS::', limit);
  if (typeof limit === 'string') {
    limit = parseInt(limit);
    // console.log(typeof limit);
    if (isNaN(limit)) throw new Error('limit should be a valid integer');
  }

  // console.log('getALLTODOS::', limit);

  const todoCollection = db.collection('todos');

  const todos = await todoCollection.find().limit(limit).toArray();

  return todos;
};

export const getTodoById = async (id) => {
  if (!id) throw new Error('Id is missing');
  try {
    const todoCollection = db.collection('todos');
    const todos = await todoCollection.find({ _id: ObjectId(id) }).toArray();
    return todos;
  } catch (err) {
    throw new Error('Id is invalid.');
  }
};
