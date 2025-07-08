export const normalizeCountryName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim();
};