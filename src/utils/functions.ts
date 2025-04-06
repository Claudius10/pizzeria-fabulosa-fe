import {FormGroup} from '@angular/forms';

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
