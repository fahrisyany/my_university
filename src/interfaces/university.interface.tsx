export interface UniversityInterface {
  alpha_two_code: string;
  country: string;
  domains: string[];
  name: string;
  web_pages: string[];
  isFavorite?: boolean
  ['state-province']?: string;
}
