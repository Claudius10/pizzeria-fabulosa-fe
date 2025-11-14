import {signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';
import {QueryResult, QueryResultWithRefetch} from './interfaces/query';

export function tempQueryResult(): QueryResult<any> {
  return {
    status: signal('pending'),
    data: signal(null),
    error: signal(null),
  };
}

export function tempQueryResultRefetch(): QueryResultWithRefetch<any> {
  return {
    status: signal('pending'),
    data: signal(null),
    error: signal(null),
    refetch: () => {}
  };
}

export const tempStatus$ = (): Observable<string> => {
  return toObservable(signal('pending'));
};
