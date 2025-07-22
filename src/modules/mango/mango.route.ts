import { Router } from 'express';
import { mangoController } from './mango.controller';
import { queryBuilder } from '../../middleware/query';
import Mango from './mango.model';

const mangoRoute = Router();

mangoRoute.post('/', mangoController.createMango);
mangoRoute.get('/:mangoId', mangoController.getMangoById);
mangoRoute.patch('/:mangoId', mangoController.updateMango);
mangoRoute.delete('/:mangoId', mangoController.deleteMangoById);
mangoRoute.get(
  '/',
  queryBuilder(Mango, ['name', 'variety']),
  mangoController.getMangos
);

export default mangoRoute;
