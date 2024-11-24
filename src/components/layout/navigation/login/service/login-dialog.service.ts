import {Injectable, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDialogService {
  private visible = signal(false);

  getIsVisible() {
    return this.visible();
  }

  getVisible(): Signal<boolean> {
    return this.visible.asReadonly();
  }

  setVisible(visible: boolean) {
    this.visible.set(visible);
  }
}
