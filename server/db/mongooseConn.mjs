import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(
  '/home/shikhar/Documents/gfg/mongodb-express-rest-api-example/server/.env'
);

export function InitializeDB() {
  mongoose
    .connect(process.env.ATLAS_URI, {
      dbName: 'gfgDb',
    })
    .then(() => {
      console.log('connected to DB');
    })
    .catch((err) => {
      console.error('error connecting to DB');
    });
}
