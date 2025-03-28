import {signal} from '@angular/core';
import {QueryResult} from './interfaces/query';
import {toObservable} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';

export const tempQueryResult = (): QueryResult => {
  return {
    status: signal('pending'),
    data: signal(undefined),
    error: signal(null),
  };
};

export const tempStatus$ = (): Observable<string> => {
  return toObservable(signal('pending'));
};
