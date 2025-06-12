export * from './offerAPI.service';
import {OfferAPIService} from './offerAPI.service';
import {ProductAPIService} from './productAPI.service';
import {StoreAPIService} from './storeAPI.service';
import {UtilAPIService} from './utilAPI.service';

export * from './productAPI.service';

export * from './storeAPI.service';

export * from './utilAPI.service';

export const APIS = [OfferAPIService, ProductAPIService, StoreAPIService, UtilAPIService];
