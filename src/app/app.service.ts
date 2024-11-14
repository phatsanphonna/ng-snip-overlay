import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { map, zip } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  #http = inject(HttpClient);
  #sanitizer = inject(DomSanitizer);

  #getArtwork() {
    return this.#http
      .get('Snip_Artwork.jpg', { responseType: 'arraybuffer' })
      .pipe(
        map((data: ArrayBuffer) => {
          return this.#sanitize('data:image/jpg;base64, ' + this.#arrayBufferToBase64(data))
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


  #sanitize(url: string) {
    return this.#sanitizer.bypassSecurityTrustUrl(url);
  }

  #arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}