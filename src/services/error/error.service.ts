import {inject, Injectable, signal} from '@angular/core';
import {ErrorDTO} from '../../interfaces/http/api';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {INVALID_TOKEN} from '../../utils/api-messages';
import {AuthService} from '../auth/auth.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {getErrorDetails, getErrorSummary, getSeverity} from '../../utils/functions';

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
      const summary = getErrorSummary(cause, this.translateService);
      const severity = getSeverity(summary);

      this.messageService.add({
        severity: severity,
        summary: summary,
        detail: getErrorDetails(cause, this.translateService),
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
}
