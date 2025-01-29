import { CountryRepository } from "../repositories/country.repository";

export class CountryService {
  constructor(private countryRepository: CountryRepository) {}

  public async getAllCountries() {
    return this.countryRepository.getAllCountries();
  }
}