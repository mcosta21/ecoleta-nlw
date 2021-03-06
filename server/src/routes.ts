import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            logitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()            
        })
    }),
    pointsController.create);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;

// index, show, create, update, delete
// Service Pattern
// Repository Pattern (Data Mapper)