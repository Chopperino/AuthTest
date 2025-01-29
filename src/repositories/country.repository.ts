import { PrismaClient } from "@prisma/client";

export class CountryRepository {
  constructor(private prisma: PrismaClient) {}

  public getAllCountries() {
    return this.prisma.country.findMany()
  }
}