export interface MovieDetails {
  Title?: string;
  Year?: string;
  Director?: string;
  Genre?: string;
  Runtime?: string;
  Plot?: string;
  Poster?: string;
  imdbRating?: string;
  imdbID?: string;
  Response: string;
  Error?: string;
}

export interface MovieResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResponse {
  Search?: MovieResult[];
  totalResults?: string;
  Response: string;
  Error?: string;
}
