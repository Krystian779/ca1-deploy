import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movieapi } from '../movieapi';

@Component({
  selector: 'app-results',
  imports: [RouterLink],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  movieService = inject(Movieapi);
}
