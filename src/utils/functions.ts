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
      description: "InvalidBearerTokenException"
    },
    error: {
      id: 0,
      fatal: false,
      logged: false,
      cause: "InvalidBearerTokenException",
      message: "InvalidBearerTokenException",
      origin: "errorService.ensureId",
      path: ""
    }
  };
}
