import {inject, Injectable, signal} from '@angular/core';
import {ErrorDTO, ResponseDTO} from '../../interfaces/http/api';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {
  ADDRESS_MAX_SIZE,
  BAD_CREDENTIALS,
  INVALID_TOKEN,
  ORDER_DELETE_TIME_ERROR,
  ORDER_NOT_FOUND,
  USER_EMAIL_ALREADY_EXISTS,
  USER_ID_NO_MATCH,
  USER_NOT_FOUND
} from '../../utils/api-messages';
import {AuthService} from '../auth/auth.service';
import {MutationResult} from '../../interfaces/mutation';
import {AccountService} from '../http/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private logoutUser: MutationResult = this.accountService.logout();
  private translateService = inject(TranslateService);
  private router = inject(Router);
  errors = signal<ErrorDTO[]>([]);

  isEmpty() {
    return this.errors().length === 0;
  }

  getErrors() {
    return this.errors.asReadonly();
  }

  handleError(response: ResponseDTO, messageService: MessageService) {
    if (response.error!.fatal) {
      this.handleFatalError(response);
    } else {
      this.handleNonFatalError(response, messageService);
    }
  }

  private addError(error: ErrorDTO) {
    this.errors.update(errors => [...errors, error]);
  }

  private handleNonFatalError(response: ResponseDTO, messageService: MessageService) {
    if (response.error === null) {
      throw new Error("Expected error is NULL");
    }

    const errorDTO: ErrorDTO = response.error;
    const cause = errorDTO.cause;
    const summary = this.getErrorSummary(cause);
    const details = this.getErrorDetails(cause);

    messageService.add({severity: this.getSeverity(summary), summary: summary, detail: details, life: 3000});

    if (INVALID_TOKEN === cause) {
      this.logout();
    }
  }

  private logout() {
    this.authService.logout();
    this.logoutUser.mutate({payload: null});

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 3000);
  }

  private handleFatalError(response: ResponseDTO) {
    if (response.error === null) {
      throw new Error("Expected error is NULL");
    }

    const errorDTO: ErrorDTO = response.error;
    this.addError(errorDTO);
    this.router.navigate(["/error"]);
  }

  handleServerNoResponse(messageService: MessageService) {
    messageService.add({
      severity: 'warn',
      summary: this.translateService.instant("toast.severity.warning"),
      detail: this.translateService.instant("toast.error.server.detail"),
      life: 3000
    });
  }

  clear() {
    this.errors.set([]);
  }

  getErrorSummary(cause: string): string {
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
      default:
        console.log("getErrorSummary: unknown cause received from BE ", cause);
        return this.translateService.instant("toast.severity.error");
    }
  }

  getErrorDetails(cause: string): string {
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
      default:
        console.log("getErrorDetails: unknown cause received from BE ", cause);
        return this.translateService.instant("toast.error.api.unknown");
    }
  }

  getSeverity(summary: string): string {
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

function getTestError(): ErrorDTO {
  return {
    id: 1,
    logged: true,
    fatal: true,
    path: "api/v1/auth/login",
    cause: "UnknownException",
    origin: "G.E.H.unknownException",
    message: "Unknown Exception Message Unknown Exception Message Unknown Exception Message Unknown " +
      "Exception Message Unknown Exception Message Unknown Exception Message Unknown Exception Message " +
      "Unknown Exception Message Unknown Exception Message Unknown Exception Message Unknown Exception " +
      "Message Unknown Exception Message Unknown Exception Message Unknown Exception Message Unknown " +
      "Exception Message Unknown Exception Message"
  };
}
