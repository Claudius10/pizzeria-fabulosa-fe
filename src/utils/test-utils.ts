import {ErrorDTO, ResponseDTO} from './interfaces/http/api';
import {QueryOnDemand, QueryResult} from './interfaces/query';
import {signal} from '@angular/core';

export function buildErrorResponse(): ResponseDTO {
  return {
    payload: null,
    timeStamp: new Date().toTimeString(),
    status: {
      error: true,
      code: 401,
      description: "Exception"
    },
    error: {
      id: 0,
      fatal: false,
      logged: false,
      cause: "Exception",
      message: "Exception",
      origin: "origin",
      path: ""
    }
  };
}

export function buildError(fatal: boolean, cause: string): ErrorDTO {
  return {
    id: 0,
    fatal: fatal,
    logged: false,
    cause: cause,
    message: "Exception",
    origin: "origin",
    path: ""
  };
}

export function buildResponse(
  payload: any,
  statusError: boolean,
  statusCode: number,
  statusDesc: string): ResponseDTO {
  return {
    payload: payload,
    timeStamp: new Date().toTimeString(),
    status: {
      error: statusError,
      code: statusCode,
      description: statusDesc
    },
    error: null
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
