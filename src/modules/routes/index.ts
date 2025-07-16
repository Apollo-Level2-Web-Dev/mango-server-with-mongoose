import { Router } from "express";
import userRoute from "../user/user.route";
import mangoRoute from "../mango/mango.route";
import orderRoute from "../order/order.route";
import authRouter from "../auth/auth.route";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/auth", authRouter);
routes.use("/mango", mangoRoute);
routes.use("/order", orderRoute);

export default routes;
