import { animate, style, transition, trigger } from '@angular/animations';
import { afterNextRender, Component, inject, signal } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { interval, switchMap } from 'rxjs';
import { AppService } from './app.service';
import { TrackInfoComponent } from './track-info/track-info.component';

@Component({
  imports: [TrackInfoComponent],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }), // Starting state
        animate('0.5s ease-out', style({ opacity: 1 })), // Animation to final state
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ opacity: 0 })), // Animation on removal
      ]),
    ])
  ]
})
export class AppComponent {
  #service = inject(AppService);

  artist = signal('');
  track = signal('');
  artwork = signal<SafeUrl | null>(null);

  artistBackup = signal('');
  trackBackup = signal('');
  artworkBackup = signal<SafeUrl | null>(null);

  constructor() {
    afterNextRender(() => {
      interval(1000)
        .pipe(switchMap(() => this.#service.getInfo()))
        .subscribe(async ([artwork, artist, track]) => {
          this.artwork.set(artwork);
          this.artist.set(artist);
          this.track.set(track);
        });
    })
  }
}
