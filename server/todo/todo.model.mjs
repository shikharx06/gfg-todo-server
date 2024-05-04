import mongoose, { ObjectId } from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: { type: String, index: true, required: true },
  description: { type: String, required: true, index: true },
  createdBy: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

export const Todo = new mongoose.model('Todos', TodoSchema);
