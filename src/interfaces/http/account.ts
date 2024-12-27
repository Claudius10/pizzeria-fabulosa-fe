export type RegisterForm = {
  name: string;
  email: string
  matchingEmail: string,
  contactNumber: number,
  password: string
  matchingPassword: string,
}

export type LoginForm = {
  email: string
  password: string;
}

export type DeleteAccountForm = {
  userId: string;
  password: string;
}
