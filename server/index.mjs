import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { todoRouter } from './todo/routes.mjs';
import { formatResponse } from './utils/formatResponse.mjs';
import { InitializeDB } from './db/mongooseConn.mjs';
// const rexpre = require('express')

// dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

// app.use(cors());
app.use(express.json());

// Load the /todos routes
app.use('/todo', todoRouter);

app.use('/', (req, res) => res.send('health check '));
// app.use('/user', userRouter);

// Global error handling
app.use((err, _req, res, next) => {
  console.log(err);
  if (err) {
    res.status(500).send(formatResponse('Error occured', null, err.message));
  }
  // res.status(500).send(formatResponse('Error occured', null, 'reason unknown'));
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  InitializeDB();
});
