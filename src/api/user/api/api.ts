export * from './registerAPI.service';
import { RegisterAPIService } from './registerAPI.service';
export * from './userAccountAPI.service';
import { UserAccountAPIService } from './userAccountAPI.service';
export const APIS = [RegisterAPIService, UserAccountAPIService];
