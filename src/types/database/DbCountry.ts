import { Country } from "@prisma/client";

export class DbCountry implements Country {
  id: string;
  name: string;
}