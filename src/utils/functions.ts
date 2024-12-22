import {FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ErrorDTO, ResponseDTO} from '../interfaces/http/api';
import {Router} from '@angular/router';
import {ErrorService} from '../services/error/error.service';
import {
  ADDRESS_MAX_SIZE,
  BAD_CREDENTIALS,
  ORDER_NOT_FOUND,
  USER_EMAIL_ALREADY_EXISTS,
  USER_ID_NO_MATCH,
  USER_NOT_FOUND
} from './api-messages';
import {TranslateService} from '@ngx-translate/core';

export function getDeliveryHours(): string[] {
  const interval = 5;
  const hourIntervals: string[] = [];
  const date = new Date();

  const coefficient = 1000 * 60 * 5;
  const roundedCurrentMins = new Date(
    Math.ceil(date.getTime() / coefficient) * coefficient
  ).getMinutes();
  const currentHour = new Date().getHours() * 60;

  for (
    let minutes = currentHour + roundedCurrentMins + 30;
    minutes < 24 * 60;
    minutes = minutes + interval
  ) {
    date.setHours(0);
    date.setMinutes(minutes);
    hourIntervals.push(date.toLocaleTimeString("es", {timeStyle: "short"}));
  }
  return hourIntervals;
}

export function isFormValid(form: FormGroup) {
  const valid = form.valid;

  if (!valid) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(`${controlName}`);
      if (!control!.valid) {
        control!.markAsTouched();
      } else {
        control!.markAsUntouched();
      }
    });
  }

  return valid;
}

export function handleError(response: ResponseDTO, messageService: MessageService, translateService: TranslateService) {
  if (response.error === null) {
    throw new Error("Expected error is NULL");
  }

  const errorDTO: ErrorDTO = response.error;
  const cause = errorDTO.cause;
  const summary = getErrorSummary(cause, translateService);
  const details = getErrorDetails(cause, translateService);

  messageService.add({severity: 'error', summary: summary, detail: details, life: 3000});
}

export function handleFatalError(response: ResponseDTO, errorService: ErrorService, router: Router) {
  if (response.error === null) {
    throw new Error("Expected error is NULL");
  }

  const errorDTO: ErrorDTO = response.error;
  errorService.addError(errorDTO);
  router.navigate(["/error"]);
}

export function getErrorSummary(cause: string, translateService: TranslateService) {
  switch (cause) {
    case USER_ID_NO_MATCH:
      return translateService.instant("error.api.user.id.no.match.summary");
    case USER_NOT_FOUND:
      return translateService.instant("error.api.user.not.found.summary");
    case BAD_CREDENTIALS:
      return translateService.instant("error.api.user.not.found.summary");
    case USER_EMAIL_ALREADY_EXISTS:
      return translateService.instant("error.api.user.email.unique.summary");
    case ADDRESS_MAX_SIZE:
      return translateService.instant("error.api.user.address.list.full.summary");
    case ORDER_NOT_FOUND:
      return translateService.instant("error.api.user.order.not.found.summary");
    default:
      console.log("getErrorSummary: unknown cause received from BE ", cause);
      return translateService.instant("error.api.unknown.summary");
  }
}

export function getErrorDetails(cause: string, translateService: TranslateService) {
  switch (cause) {
    case USER_ID_NO_MATCH:
      return translateService.instant("error.api.user.id.no.match.detail");
    case USER_NOT_FOUND:
      return translateService.instant("error.api.user.not.found.detail");
    case BAD_CREDENTIALS:
      return translateService.instant("error.api.user.not.found.detail");
    case USER_EMAIL_ALREADY_EXISTS:
      return translateService.instant("error.api.user.email.unique.detail");
    case ADDRESS_MAX_SIZE:
      return translateService.instant("error.api.user.address.list.full.detail");
    case ORDER_NOT_FOUND:
      return translateService.instant("error.api.user.order.not.found.detail");
    default:
      console.log("getErrorDetails: unknown cause received from BE ", cause);
      return translateService.instant("error.api.unknown.detail");
  }
}
