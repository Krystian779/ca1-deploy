import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDetails, MovieResult, SearchResponse } from './models/moviedetails.interface';

@Injectable({
  providedIn: 'root',
})
export class Movieapi {
  private http = inject(HttpClient);

  private apiURL = 'https://www.omdbapi.com/';
  private apiKey = '49677344';

  movie = signal<MovieDetails | null>(null);
  movies = signal<MovieResult[]>([]);
  currentPage = signal(1);
  totalResults = signal(0);
  searchTitle = signal('');

  getMovies(title: string, page: number): void {
    this.searchTitle.set(title);
    this.currentPage.set(page);

    this.http
      .get<SearchResponse>(`${this.apiURL}?apikey=${this.apiKey}&s=${title}&page=${page}`)
      .subscribe((data) => {
        if (data.Response === 'True' && data.Search) {
          this.movies.set(data.Search);

          // NEW: OMDb totalResults comes as text, so convert to number
          this.totalResults.set(Number(data.totalResults));
        } else {
          this.movies.set([]);
          this.movie.set({
            Response: 'False',
            Error: data.Error,
          });
        }
      });
  }

  getMovieById(id: string): void {
    this.http
      .get<MovieDetails>(`${this.apiURL}?apikey=${this.apiKey}&i=${id}`)
      .subscribe((data) => {
        this.movie.set(data);
      });
  }

  getMaxPages(): number {
    // NEW: OMDb shows 10 results per page
    return Math.ceil(this.totalResults() / 10);
  }

  nextPage(): void {
    if (this.currentPage() < this.getMaxPages()) {
      this.getMovies(this.searchTitle(), this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.getMovies(this.searchTitle(), this.currentPage() - 1);
    }
  }
}
