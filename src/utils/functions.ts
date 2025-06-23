import {FormGroup} from '@angular/forms';

export function logout(baseUri: string) {
  const csrfToken = getCookie('XSRF-TOKEN');

  if (!csrfToken) {
    console.error('CSRF token not found');
    return;
  }

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = baseUri + '/logout';

  const csrfInput = document.createElement('input');
  csrfInput.type = 'hidden';
  csrfInput.name = '_csrf';
  csrfInput.value = csrfToken;

  form.appendChild(csrfInput);
  document.body.appendChild(form);
  form.submit();
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
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
