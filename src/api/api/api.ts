export * from './anonymousUserAPI.service';
import {AnonymousUserAPIService} from './anonymousUserAPI.service';
import {LoginAPIService} from './loginAPI.service';
import {LogoutAPIService} from './logoutAPI.service';
import {ResourcesAPIService} from './resourcesAPI.service';
import {UserAccountAPIService} from './userAccountAPI.service';
import {UserAddressAPIService} from './userAddressAPI.service';
import {UserOrdersAPIService} from './userOrdersAPI.service';

export * from './loginAPI.service';

export * from './logoutAPI.service';

export * from './resourcesAPI.service';

export * from './userAccountAPI.service';

export * from './userAddressAPI.service';

export * from './userOrdersAPI.service';

export const APIS = [AnonymousUserAPIService, LoginAPIService, LogoutAPIService, ResourcesAPIService, UserAccountAPIService, UserAddressAPIService, UserOrdersAPIService];
