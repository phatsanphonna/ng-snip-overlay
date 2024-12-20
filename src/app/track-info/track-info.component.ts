import { Component, effect, ElementRef, input, viewChild } from "@angular/core";

@Component({
  selector: 'app-track-info',
  standalone: true,
  templateUrl: './track-info.component.html',

})
export class TrackInfoComponent {
  readonly artist = input('');
  readonly track = input('');
  readonly bgColor = input('#1f2937');

  containerEl = viewChild<ElementRef>('container');

  constructor() {
    effect(() => {
      this.containerEl()!.nativeElement.style.backgroundColor = this.bgColor();
    })
  }
}