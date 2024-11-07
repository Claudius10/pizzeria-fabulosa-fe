export type RegisterForm = {
  name: string;
  email: string
  matchingEmail: string,
  password: string
  matchingPassword: string,
}

export type LoginForm = {
  email: string
  password: string;
}

export type NameChangeForm = {
  name: string
  password: string;
}

export type EmailChangeForm = {
  email: string
  password: string;
}

export type ContactNumberChangeForm = {
  contactNumber: number;
  password: string;
}

export type PasswordChangeForm = {
  currentPassword: string;
  newPassword: string;
  matchingNewPassword: string;
}

export type AccountDeleteForm = {
  password: string;
}
