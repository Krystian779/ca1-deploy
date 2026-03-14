import { Component, inject, input, OnInit } from '@angular/core';
import { Movieapi } from '../movieapi';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  movieService = inject(Movieapi);

  id = input.required<string>();
  // NEW: gets the route id directly into the component

  ngOnInit(): void {
    this.movieService.getMovieById(this.id());
  }
}
