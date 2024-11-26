import { Component, input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-album',
  standalone: true,
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  readonly artwork = input.required<SafeUrl>()
}