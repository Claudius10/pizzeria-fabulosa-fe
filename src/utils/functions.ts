import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
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
} from './api-messages';

export function getSeverity(summary: string): string {
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

export function getErrorSummary(cause: string, translateService: TranslateService): string {
  switch (cause) {
    case USER_ID_NO_MATCH:
      return translateService.instant("toast.severity.error");
    case USER_NOT_FOUND:
      return translateService.instant("toast.severity.warning");
    case BAD_CREDENTIALS:
      return translateService.instant("toast.severity.warning");
    case USER_EMAIL_ALREADY_EXISTS:
      return translateService.instant("toast.severity.warning");
    case ADDRESS_MAX_SIZE:
      return translateService.instant("toast.severity.warning");
    case ORDER_NOT_FOUND:
      return translateService.instant("toast.severity.error");
    case ORDER_DELETE_TIME_ERROR:
      return translateService.instant("toast.severity.warning");
    case INVALID_TOKEN:
      return translateService.instant("toast.severity.error");
    case DUMMY_ACCOUNT_ERROR:
      return translateService.instant("toast.severity.warning");
    default:
      return translateService.instant("toast.severity.error");
  }
}

export function getErrorDetails(cause: string, translateService: TranslateService): string {
  switch (cause) {
    case USER_ID_NO_MATCH:
      return translateService.instant("toast.error.api.user.id.no.match.detail");
    case USER_NOT_FOUND:
      return translateService.instant("toast.error.api.user.not.found.detail");
    case BAD_CREDENTIALS:
      return translateService.instant("toast.error.api.user.not.found.detail");
    case USER_EMAIL_ALREADY_EXISTS:
      return translateService.instant("toast.error.api.user.email.unique.detail");
    case ADDRESS_MAX_SIZE:
      return translateService.instant("toast.error.api.user.address.list.full.detail");
    case ORDER_NOT_FOUND:
      return translateService.instant("toast.error.api.user.order.not.found.detail");
    case ORDER_DELETE_TIME_ERROR:
      return translateService.instant("toast.error.api.user.order.cancel.not.allowed");
    case INVALID_TOKEN:
      return translateService.instant("toast.error.api.user.invalid.token");
    case DUMMY_ACCOUNT_ERROR:
      return translateService.instant("toast.error.api.user.dummy");
    default:
      return translateService.instant("toast.error.api.unknown");
  }
}

export function isFormValid(form: FormGroup) {
  const valid = form.valid;
  const matchingEmailsError = form.hasError('emailsNotMatching');
  const matchingPasswordsError = form.hasError('passwordsNotMatching');

  if (!valid) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(`${controlName}`);
      if (!control!.valid) {
        control!.markAsTouched();
      } else {
        if (!matchingEmailsError && !matchingPasswordsError) {
          control!.markAsUntouched();
        }
      }
    });
  }

  return valid;
}

export function getLightIcon(type: string) {
  switch (type) {
    case 'pizza':
      return '/assets/icons/pizza-light.png';
    case 'beverage':
      return '/assets/icons/beverage-light.png';
    default:
      return '';
  }
}

export function getDarkIcon(type: string) {
  switch (type) {
    case 'pizza':
      return '/assets/icons/pizza-dark.png';
    case 'beverage':
      return '/assets/icons/beverage-dark.png';
    default:
      return '';
  }
}
