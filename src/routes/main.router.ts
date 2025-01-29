import express from "express";
import { MainController } from "../controllers/main.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const main = express.Router();
const controller = new MainController();

main.get('/', authMiddleware, controller.main);

export { main }