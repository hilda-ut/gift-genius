import { Country } from '@/types/country';
import { normalizeCountryName } from './normalize-country-name';

export const mapToCountry = (countryName: string): Country => {
  const normalized = normalizeCountryName(countryName);

  const countryMap: Record<string, Country> = {
    'united states': 'US',
    'canada': 'Canada',
    'united arab emirates': 'UAE',
    'united kingdom': 'UK',
    'germany': 'Germany',
    'japan': 'Japan',
    'australia': 'Australia',
  };

  return countryMap[normalized] ?? 'US';
};