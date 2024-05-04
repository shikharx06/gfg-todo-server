import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { todoRouter } from './todo/routes.mjs';
import { formatResponse } from './utils/formatResponse.mjs';
import { InitializeDB } from './db/mongooseConn.mjs';
import { authRouter } from './users/routes.mjs';
import { verifyUser } from './utils/middleware.mjs';
import { uploadRouter } from './storage/route.mjs';
// const rexpre = require('express')

// dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/auth', authRouter);
// Load the /todos routes
app.use('/todo', verifyUser, todoRouter);
app.use('/upload', verifyUser, uploadRouter);

// 404 router
app.use('/', (req, res) =>
  res.status(404).send(`Missing route ${req.method} ${req.path}`)
);
// app.use('/user', userRouter);

// Global error handling
app.use((err, _req, res, next) => {
  // console.log(err);
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
