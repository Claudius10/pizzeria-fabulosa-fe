import {APIError} from '../api/user';

export function buildError(fatal: boolean, cause: string, message: string): APIError {
  return {
    id: 0,
    fatal: fatal,
    logged: false,
    cause: cause,
    message: message,
    origin: "origin",
    path: "",
    createdOn: ""
  };
}
