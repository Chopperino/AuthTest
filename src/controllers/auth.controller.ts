import { AuthService } from "../services/auth.service";
import { CountryService } from "../services/country.service";
import { Request, Response } from "express";

export class AuthController {
  constructor(
    private authService: AuthService,
    private countryService: CountryService
  ) {}

  public register = async (req: Request, res: Response): Promise<any> => {
    try {
      const {email, login, real_name, password, birth_date, country_id} = req.body;
      const parsedBirthDate = new Date(birth_date);

      const token = await this.authService.registerUser({
        email, login, real_name, password, birth_date: parsedBirthDate, country_id
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(201).redirect('/');
    } catch (error: any) {
      res.render('register', {
        error: error.message || null,
        countries: await this.countryService.getAllCountries(),
        formData: req.body
      });
    }
  }

  public login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { identifier, password } = req.body;
      const token = await this.authService.loginUser({ identifier, password});
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).redirect('/');
    } catch (error: any) {
      res.render('login', {
        error: error.message || null,
        formData: req.body
      });
    }
  }

  public logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.redirect('/')
  }

  public renderRegisterPage = async (req: Request, res: Response): Promise<any> => {
    try {
      const countries = await this.countryService.getAllCountries();
      res.render('register', { countries, formData: {}, error: null });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  public renderLoginPage = (req: Request, res: Response) => {
    res.render('login', { formData: {}, error: null });
  }
}