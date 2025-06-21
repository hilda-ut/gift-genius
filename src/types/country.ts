export type Country =
  | 'US'
  | 'UAE'
  | 'Canada'
  | 'UK'
  | 'Germany'
  | 'Japan'
  | 'Australia';

export const AMAZON_DOMAINS: Record<Country, string> = {
  US: 'amazon.com',
  UAE: 'amazon.ae',
  Canada: 'amazon.ca',
  UK: 'amazon.co.uk',
  Germany: 'amazon.de',
  Japan: 'amazon.co.jp',
  Australia: 'amazon.com.au',
};

export const getAmazonDomain = (country: Country): string => {
  return AMAZON_DOMAINS[country];
};

export const normalizeCountryName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim();
};

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
