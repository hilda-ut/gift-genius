import type { Country } from "@types/country";
import { AMAZON_DOMAINS } from './amazon-domains';

export const getAmazonDomain = (country: Country): string => {
  return AMAZON_DOMAINS[country];
};