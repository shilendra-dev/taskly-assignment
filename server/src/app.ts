import express from 'express';
import './routes'; //this imports all the routes
import { routes } from './lib/ApiRouter';

export const createApp = () => {
  const app = express();

  //setting up routes
  app.use("/api", routes);

  return app;
};