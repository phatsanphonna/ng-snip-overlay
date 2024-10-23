import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { zip } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  #http = inject(HttpClient);

  #getArtwork() {
    return this.#http.get('Snip_Artwork.jpg', { responseType: 'arraybuffer' });
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