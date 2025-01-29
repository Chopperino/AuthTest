import { PrismaClient } from "@prisma/client";
import { CountryRepository } from "../repositories/country.repository";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";
import { CountryService } from "./country.service";

const prisma = new PrismaClient();

const countryRepository = new CountryRepository(prisma);
const userRepository = new UserRepository(prisma);

export const authService = new AuthService(userRepository);
export const countryService = new CountryService(countryRepository);