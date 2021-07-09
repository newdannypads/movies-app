
export interface MoviesTrending {
  page:          number;
  results:       Result[];
  total_pages:   number;
  total_results: number;
}

export interface Result {
  video?:            boolean;
  vote_average:      number;
  overview:          string;
  release_date?:     string;
  vote_count:        number;
  adult?:            boolean;
  backdrop_path:     string;
  title?:            string;
  genre_ids:         number[];
  id:                number;
  original_language: OriginalLanguage;
  original_title?:   string;
  poster_path:       string;
  popularity:        number;
  media_type:        MediaType;
  name?:             string;
  original_name?:    string;
  origin_country?:   string[];
  first_air_date?:   string;
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

export enum OriginalLanguage {
  En = "en",
  Ru = "ru",
}
