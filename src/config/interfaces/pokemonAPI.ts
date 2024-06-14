export interface Result {
  name: string;
  url: string;
}

export interface PokemonAPIResponse {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}
