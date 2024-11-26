import { animate, style, transition, trigger } from '@angular/animations';
import { afterNextRender, Component, inject, signal } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { interval, map, switchMap } from 'rxjs';
import { AppService } from './app.service';
import { TrackInfoComponent } from './track-info/track-info.component';
import { UtilService } from './util.service';
import { AlbumComponent } from './album/album.component';

@Component({
  imports: [TrackInfoComponent, AlbumComponent],
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
  readonly #service = inject(AppService);
  #util = inject(UtilService);

  artist = signal('');
  track = signal('');
  artwork = signal<SafeUrl | null>(null);
  bgColor = signal<string>('#000');

  constructor() {
    afterNextRender(() => {
      interval(1000)
        .pipe(
          switchMap(() => this.#service.getInfo()),
          map(([artwork, artist, track]) => {
            return {
              artwork: this.#util.getImageUrl(artwork),
              artist,
              track,
              artworkBgColor: artwork
            }
          }),
        )
        .subscribe(async ({ artwork, artist, track, artworkBgColor }) => {
          this.artwork.set(artwork);
          this.artist.set(artist);
          this.track.set(track);
          this.bgColor.set(await this.#util.getAverageColor(artworkBgColor));
          console.log(this.bgColor());
        });
    })
  }
}
