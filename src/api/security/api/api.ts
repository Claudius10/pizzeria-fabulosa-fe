export * from './registerAPI.service';
import { RegisterAPIService } from './registerAPI.service';
export * from './userAPI.service';
import { UserAPIService } from './userAPI.service';
export const APIS = [RegisterAPIService, UserAPIService];
