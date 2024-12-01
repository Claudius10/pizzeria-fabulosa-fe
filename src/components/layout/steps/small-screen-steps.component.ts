import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-small-screen-steps',
  standalone: true,
  imports: [],
  templateUrl: './small-screen-steps.component.html',
  styleUrl: './small-screen-steps.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallScreenStepsComponent {
  activeIndex = input.required<number>();
  items = input.required<MenuItem[]>();
}
