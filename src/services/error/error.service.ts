import {inject, Injectable, signal} from '@angular/core';
import {ErrorDTO} from '../../utils/interfaces/http/api';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

import {
  ADDRESS_MAX_SIZE,
  BAD_CREDENTIALS,
  DUMMY_ACCOUNT_ERROR,
  INVALID_TOKEN,
  ORDER_DELETE_TIME_ERROR,
  ORDER_NOT_FOUND,
  USER_EMAIL_ALREADY_EXISTS,
  USER_ID_NO_MATCH,
  USER_NOT_FOUND
} from '../../utils/api-messages';
import {AuthService} from '../auth/auth.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  private queryClient = inject(QueryClient);
  private authService = inject(AuthService);
  private router = inject(Router);
  errors = signal<ErrorDTO[]>([]);

  handleError(error: ErrorDTO) {
    if (error === null) {
      throw new Error("Expected error cannot be null");
    }

    if (error.fatal) {
      this.addError(error);
      this.router.navigate(["/error"]);
    } else {
      const cause = error.cause;
      const summary = this.getErrorSummary(cause);
      const severity = this.getSeverity(summary);
      const errorDetails = this.getErrorDetails(cause);

      if (errorDetails.includes("Unknown error") || errorDetails.includes("Error desconocido")) {
        console.error("Unknown Error", error);
      }

      this.messageService.add({
        severity: severity,
        summary: summary,
        detail: errorDetails,
        life: 3000
      });

      if (INVALID_TOKEN === cause) {
        this.queryClient.removeQueries({queryKey: ["user"]});
        this.logout();
      }
    }
  }

  handleServerNoResponse() {
    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant("toast.severity.error"),
      detail: this.translateService.instant("toast.error.server.detail"),
      life: 3000
    });
  }

  private logout() {
    this.authService.logout();
    // back-end deletes cookies
    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 3000);
  }

  private addError(error: ErrorDTO) {
    this.errors.update(errors => [...errors, error]);
  }

  clear() {
    this.errors.set([]);
  }

  isEmpty() {
    return this.errors().length === 0;
  }

  getErrors() {
    return this.errors.asReadonly();
  }

  private getErrorSummary(cause: string): string {
    switch (cause) {
      case USER_ID_NO_MATCH:
        return this.translateService.instant("toast.severity.error");
      case USER_NOT_FOUND:
        return this.translateService.instant("toast.severity.warning");
      case BAD_CREDENTIALS:
        return this.translateService.instant("toast.severity.warning");
      case USER_EMAIL_ALREADY_EXISTS:
        return this.translateService.instant("toast.severity.warning");
      case ADDRESS_MAX_SIZE:
        return this.translateService.instant("toast.severity.warning");
      case ORDER_NOT_FOUND:
        return this.translateService.instant("toast.severity.error");
      case ORDER_DELETE_TIME_ERROR:
        return this.translateService.instant("toast.severity.warning");
      case INVALID_TOKEN:
        return this.translateService.instant("toast.severity.error");
      case DUMMY_ACCOUNT_ERROR:
        return this.translateService.instant("toast.severity.warning");
      default:
        return this.translateService.instant("toast.severity.error");
    }
  }

  private getErrorDetails(cause: string): string {
    switch (cause) {
      case USER_ID_NO_MATCH:
        return this.translateService.instant("toast.error.api.user.id.no.match.detail");
      case USER_NOT_FOUND:
        return this.translateService.instant("toast.error.api.user.not.found.detail");
      case BAD_CREDENTIALS:
        return this.translateService.instant("toast.error.api.user.not.found.detail");
      case USER_EMAIL_ALREADY_EXISTS:
        return this.translateService.instant("toast.error.api.user.email.unique.detail");
      case ADDRESS_MAX_SIZE:
        return this.translateService.instant("toast.error.api.user.address.list.full.detail");
      case ORDER_NOT_FOUND:
        return this.translateService.instant("toast.error.api.user.order.not.found.detail");
      case ORDER_DELETE_TIME_ERROR:
        return this.translateService.instant("toast.error.api.user.order.cancel.not.allowed");
      case INVALID_TOKEN:
        return this.translateService.instant("toast.error.api.user.invalid.token");
      case DUMMY_ACCOUNT_ERROR:
        return this.translateService.instant("toast.error.api.user.dummy");
      default:
        return this.translateService.instant("toast.error.api.unknown");
    }
  }

  private getSeverity(summary: string): string {
    switch (summary) {
      case "Información":
        return "info";
      case "Information":
        return "info";
      case "Advertencia":
        return "warn";
      case "Warning":
        return "warn";
      case "Error":
        return "error";
      default:
        return "error";
    }
  }
}
