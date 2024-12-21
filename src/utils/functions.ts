import {FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ApiError} from '../interfaces/mutation';
import {ErrorDTO, ResponseDTO} from '../interfaces/http/api';
import {Router} from '@angular/router';
import {ErrorService} from '../services/error/error.service';

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

export function handleError(error: Error, summary: string, detail: string, messageService: MessageService, errorService: ErrorService, router: Router) {
  const apiError = error as ApiError;
  const errorResponse: ResponseDTO = apiError.error;

  if (errorResponse.error === null) {
    console.log(errorResponse);
    throw new Error("Expected error is NULL");
  }

  const errorDTO: ErrorDTO = errorResponse.error;

  if (errorDTO.fatal) {
    errorService.addError(errorDTO);
    router.navigate(["/error"]);
  } else {
    messageService.add({severity: 'error', summary: summary, detail: detail, life: 3000});
  }
}
