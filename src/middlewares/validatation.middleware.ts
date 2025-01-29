import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { countryService } from "../services";

export const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const view = req.route.path.substring(1);
    return res.render(view, {
      error: errors.array()[0].msg,
      countries: await countryService.getAllCountries(),
      formData: req.body
    });
  }
  next();
};
