import {FormGroup} from '@angular/forms';
import {ResponseDTO} from '../interfaces/http/api';

function getTimezoneOffset() {
  const today = new Date();
  const jan = new Date(today.getFullYear(), 0, 1);
  const jul = new Date(today.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

export function isDst(date: Date) {
  return date.getTimezoneOffset() < getTimezoneOffset();
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

export function buildErrorResponse(): ResponseDTO {
  return {
    payload: null,
    timeStamp: new Date().toTimeString(),
    status: {
      error: true,
      code: 401,
      description: "Exception"
    },
    error: {
      id: 0,
      fatal: false,
      logged: false,
      cause: "Exception",
      message: "Exception",
      origin: "origin",
      path: ""
    }
  };
}

export function buildResponse(
  payload: any,
  statusError: boolean,
  statusCode: number,
  statusDesc: string): ResponseDTO {
  return {
    payload: payload,
    timeStamp: new Date().toTimeString(),
    status: {
      error: statusError,
      code: statusCode,
      description: statusDesc
    },
    error: null
  };
}

export function ensureId(ids: string[]) {
  for (let id of ids) {
    if (id === null) {
      return false;
    }
  }
  return true;
}
