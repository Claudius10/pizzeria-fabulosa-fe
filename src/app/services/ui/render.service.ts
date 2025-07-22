import {Injectable, signal} from '@angular/core';
import {MODE} from '../../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  private readonly login = signal(false);
  private readonly logout = signal(false);
  private readonly navBarMode = signal<MODE>(MODE.USER);
  private readonly routesDrawer = signal(false);
  private readonly cartDrawer = signal(false);

  switchLogin(state: boolean) {
    this.login.set(state);
  }

  switchLogout(state: boolean) {
    this.logout.set(state);
  }

  switchNavBarMode(mode: MODE) {
    this.navBarMode.set(mode);
  }

  switchRoutesDrawer(state: boolean) {
    this.routesDrawer.set(state);
  }

  switchCartDrawer(state: boolean) {
    this.cartDrawer.set(state);
  }

  getLogin() {
    return this.login.asReadonly();
  }

  getLogout() {
    return this.logout.asReadonly();
  }

  getNavBarMode() {
    return this.navBarMode.asReadonly();
  }

  getRoutesDrawer() {
    return this.routesDrawer.asReadonly();
  }

  getCartDrawer() {
    return this.cartDrawer.asReadonly();
  }
}
