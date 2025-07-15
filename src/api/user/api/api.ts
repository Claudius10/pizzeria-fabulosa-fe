export * from './registerAPI.service';
import {RegisterAPIService} from './registerAPI.service';
import {UserAccountAPIService} from './userAccountAPI.service';

export * from './userAccountAPI.service';

export const APIS = [RegisterAPIService, UserAccountAPIService];
