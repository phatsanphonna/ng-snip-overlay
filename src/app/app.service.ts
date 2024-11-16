import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { map, zip } from "rxjs";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  #http = inject(HttpClient);
  #util = inject(UtilService);

  #getArtwork() {
    return this.#http
      .get('Snip_Artwork.jpg', { responseType: 'arraybuffer' })
      .pipe(
        map((data: ArrayBuffer) => {
          return this.#util.getImageUrl(data);
        })
      );
  }

  #getArtist() {
    return this.#http.get('Snip_Artist.txt', { responseType: 'text' });
  }

  #getTrack() {
    return this.#http.get('Snip_Track.txt', { responseType: 'text' });
  }

  getInfo() {
    return zip([
      this.#getArtwork(),
      this.#getArtist(),
      this.#getTrack()
    ])
  }
}