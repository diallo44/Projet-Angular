import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  template: `
    <span [style.color]="color"
          style="font-weight: bold; font-size: 1.1rem;">
      #{{ name }}
    </span>
  `
})
export class TagComponent {
  @Input() id!: number;
  @Input() name: string = '';
  @Input() color: string = '#000000';
}
