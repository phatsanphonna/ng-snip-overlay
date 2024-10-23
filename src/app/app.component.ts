import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, switchMap } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  #service = inject(AppService);

  artist = signal('');
  track = signal('');
  artwork = signal<ArrayBuffer | null>(null);

  constructor() {
    afterNextRender(() => {
      interval(1000)
        .pipe(switchMap(() => this.#service.getInfo()))
        .subscribe(([artwork, artist, track]) => {
          this.artwork.set(artwork);
          this.artist.set(artist);
          this.track.set(track);
        });
    })
  }
}
