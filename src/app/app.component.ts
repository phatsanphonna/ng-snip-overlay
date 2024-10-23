import { NgOptimizedImage } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  #service = inject(AppService);

  constructor() {
    afterNextRender(() => {
      interval(1000)
        .pipe(switchMap(() => this.#service.getInfo()))
        .subscribe(([artwork, artist, track]) => {
          console.log('Artwork:', artwork);
          console.log('Artist:', artist);
          console.log('Track:', track);
        });
    })
  }
}
