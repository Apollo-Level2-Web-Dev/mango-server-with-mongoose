import { Router } from 'express';
import { orderController } from './order.controller';
import { auth } from '../../middleware/auth';
import { UserRole } from '../user/user.constrain';

const orderRoute = Router();

orderRoute.post(
  '/',
  auth(Object.values(UserRole)),
  orderController.createOrder
);
orderRoute.get('/', auth(Object.values(UserRole)), orderController.getOrders);

export default orderRoute;
