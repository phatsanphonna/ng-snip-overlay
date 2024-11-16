import { inject, Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FastAverageColor } from 'fast-average-color';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  #sanitizer = inject(DomSanitizer);

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

  async getAverageColor(imageUrl: ArrayBuffer): Promise<string> {
    const blob = new Blob([imageUrl], { type: 'image/jpg' });
    const url = URL.createObjectURL(blob);

    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(url);
    return color.hex;
  }

  getImageUrl(data: ArrayBuffer) {
    return this.#sanitize('data:image/jpg;base64, ' + this.#arrayBufferToBase64(data))
  }
}