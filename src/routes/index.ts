import { Router } from 'express';
import userRoute from '../modules/user/user.route';
import authRouter from '../modules/auth/auth.route';
import mangoRoute from '../modules/mango/mango.route';
import orderRoute from '../modules/order/order.route';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/auth', authRouter);
routes.use('/mango', mangoRoute);
routes.use('/order', orderRoute);

export default routes;
