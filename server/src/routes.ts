import express from 'express';

import PointController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router();
const pointsController = new PointController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);

routes.get('/points', pointsController.index);
routes.get('/points/:id?/:name?', pointsController.show);

export default routes;

// index, show, create, update, delete
// Service Pattern
// Repository Pattern (Data Mapper)