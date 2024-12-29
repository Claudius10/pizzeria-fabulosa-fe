import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-small-screen-steps',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './small-screen-steps.component.html',
  styleUrl: './small-screen-steps.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallScreenStepsComponent {
  activeIndex = input.required<number>();
  items = input.required<MenuItem[]>();
}
