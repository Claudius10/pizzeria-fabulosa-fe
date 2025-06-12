export * from './anonymousUserAPI.service';
import {AnonymousUserAPIService} from './anonymousUserAPI.service';
import {UserAccountAPIService} from './userAccountAPI.service';

export * from './userAccountAPI.service';

export const APIS = [AnonymousUserAPIService, UserAccountAPIService];
