import {FormGroup} from '@angular/forms';

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

export function isStepValid(form: FormGroup) {
  const valid = form.valid;
  console.log(valid);

  if (!valid) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(`${controlName}`);
      if (!control!.valid) {
        console.log(control?.errors);
        control!.markAsTouched();
      } else {
        control!.markAsUntouched();
      }
    });
  }

  return valid;
}
