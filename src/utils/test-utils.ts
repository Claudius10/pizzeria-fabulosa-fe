import {QueryOnDemand, QueryResult} from './interfaces/query';
import {signal} from '@angular/core';
import {APIError, ResponseDTO} from '../api';

export function buildErrorResponse(): ResponseDTO {
  return {
    apiError: {
      id: 0,
      fatal: false,
      logged: false,
      cause: "Exception",
      message: "Exception",
      origin: "origin",
      path: "",
      createdOn: ""
    }
  };
}

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

export function buildResponse(): ResponseDTO {
  return {
    apiError: buildError(false, "")
  };
}

export function buildQueryResult(): QueryResult {
  return {
    status: signal("pending"),
    error: signal(null),
    data: signal(undefined),
  };
}

export function buildQueryOnDemand(): QueryOnDemand {
  return {
    refetch: () => new Promise(() => {
    }),
    status: signal("pending"),
    error: signal(null),
    data: signal(undefined),
  };
}
