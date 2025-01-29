import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { authService, countryService } from "../services";
import { body, check } from "express-validator";
import { validateRequest } from "../middlewares/validatation.middleware";

const auth = express.Router();
const controller = new AuthController(authService, countryService);

auth.get('/register',  controller.renderRegisterPage);
auth.get('/login', controller.renderLoginPage);

auth.post('/register', [
  body('email').isEmail().withMessage('Invalid email'),
  body('login').isLength({ min: 4 }).withMessage('Login must be at least 4 characters'),
  body('real_name').notEmpty().withMessage('Real name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('birth_date').isDate().withMessage('Birth date must be a valid date'),
  body('country_id').notEmpty().withMessage('Country is required'),
  check('agree').equals('on').withMessage('You must agree with Terms and Conditions'),
  validateRequest
], controller.register);
auth.post('/login', [
  body('identifier').notEmpty().withMessage('Login/Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
], controller.login);
auth.get('/logout', controller.logout);

export { auth }