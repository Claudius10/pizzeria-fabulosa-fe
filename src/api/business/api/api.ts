export * from './anonymousOrdersAPI.service';
import {AnonymousOrdersAPIService} from './anonymousOrdersAPI.service';
import {UserOrdersAPIService} from './userOrdersAPI.service';

export * from './userOrdersAPI.service';

export const APIS = [AnonymousOrdersAPIService, UserOrdersAPIService];
