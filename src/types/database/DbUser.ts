import { Country, User } from "@prisma/client";

export class DbUser implements User {
  id: string;
  email: string;
  login: string;
  real_name: string;
  password: string;
  birth_date: Date;
  country: Country;
  country_id: string;
  createdAt: Date;
}