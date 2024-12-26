import {FormGroup} from '@angular/forms';

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
