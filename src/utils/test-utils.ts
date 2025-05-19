import {APIError} from '../api';

export function buildError(fatal: boolean, cause: string): APIError {
  return {
    id: 0,
    fatal: fatal,
    logged: false,
    cause: cause,
    message: "Exception",
    origin: "origin",
    path: "",
    createdOn: ""
  };
}
