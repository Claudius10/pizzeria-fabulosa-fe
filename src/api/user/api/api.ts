export * from './anonymousUserAPI.service';
import { AnonymousUserAPIService } from './anonymousUserAPI.service';
export * from './userAccountAPI.service';
import { UserAccountAPIService } from './userAccountAPI.service';
export const APIS = [AnonymousUserAPIService, UserAccountAPIService];
