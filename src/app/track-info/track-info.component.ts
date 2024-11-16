import { Component, input } from "@angular/core";

@Component({
  selector: 'app-track-info',
  standalone: true,
  templateUrl: './track-info.component.html',

})
export class TrackInfoComponent {
  artist = input('');
  track = input('');
}