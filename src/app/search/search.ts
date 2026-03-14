import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movieapi } from '../movieapi';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  movieService = inject(Movieapi);

  title = '';

  searchMovies(): void {
    if (this.title.trim() !== '') {
      this.movieService.getMovies(this.title, 1);
    }
  }
}
