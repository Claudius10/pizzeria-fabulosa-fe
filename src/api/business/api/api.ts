export * from './anonymousOrdersAPI.service';
import { AnonymousOrdersAPIService } from './anonymousOrdersAPI.service';
export * from './userOrdersAPI.service';
import { UserOrdersAPIService } from './userOrdersAPI.service';
export const APIS = [AnonymousOrdersAPIService, UserOrdersAPIService];
