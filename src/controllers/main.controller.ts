import { Request, Response } from "express";

export class MainController {
  public main = (req: Request, res: Response) => {
    res.render('index', { user: req.user || null });
  }
}