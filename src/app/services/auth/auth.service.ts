import {inject, Injectable, signal} from '@angular/core';
import {ADMIN, AUTH} from '../../../utils/constants';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {UserInfoDTO} from '../../../api/security';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly isAuthenticated = signal(false);
  private readonly id = signal<number | null>(null);
  private readonly email = signal<string | null>(null);
  private readonly name = signal<string | null>(null);
  private readonly phoneNumber = signal<string | null>(null);
  private readonly roles = signal<string[]>([]);

  authenticate(userInfo: UserInfoDTO): boolean {
    if (userInfo === null) {
      return false;
    }

    this.id.set(Number(userInfo.id));
    this.email.set(userInfo.email);
    this.name.set(userInfo.name);
    this.phoneNumber.set(userInfo.phone_number);
    this.roles.set(userInfo.roles);
    this.isAuthenticated.set(true);
    this.localStorageService.add(AUTH, "true");
    if (this.isAdmin()) {
      this.localStorageService.add(ADMIN, "true");
    }
    return true;
  }

  logout() {
    this.localStorageService.remove(AUTH);
    if (this.isAdmin()) {
      this.localStorageService.remove(ADMIN);
    }
    this.id.set(null);
    this.email.set(null);
    this.name.set(null);
    this.phoneNumber.set(null);
    this.isAuthenticated.set(false);
  }

  isAdmin() {
    return this.roles().includes("ADMIN");
  }

  getIsAuthenticated() {
    return this.isAuthenticated.asReadonly();
  }

  getId() {
    return this.id.asReadonly();
  }

  getEmail() {
    return this.email.asReadonly();
  }

  getName() {
    return this.name.asReadonly();
  }

  getPhoneNumber() {
    return this.phoneNumber.asReadonly();
  }

  getRoles() {
    return this.roles.asReadonly();
  }
}
