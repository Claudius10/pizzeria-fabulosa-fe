export * from './offerAPI.service';
import { OfferAPIService } from './offerAPI.service';
export * from './productAPI.service';
import { ProductAPIService } from './productAPI.service';
export * from './storeAPI.service';
import { StoreAPIService } from './storeAPI.service';
export * from './utilAPI.service';
import { UtilAPIService } from './utilAPI.service';
export const APIS = [OfferAPIService, ProductAPIService, StoreAPIService, UtilAPIService];
