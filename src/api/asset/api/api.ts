export * from './anonymousOrdersAPI.service';
import {AnonymousOrdersAPIService} from './anonymousOrdersAPI.service';
import {AnonymousUserAPIService} from './anonymousUserAPI.service';
import {OfferAPIService} from './offerAPI.service';
import {ProductAPIService} from './productAPI.service';
import {StoreAPIService} from './storeAPI.service';
import {UtilAPIService} from './utilAPI.service';

export * from './anonymousUserAPI.service';

export * from './offerAPI.service';

export * from './productAPI.service';

export * from './storeAPI.service';

export * from './utilAPI.service';

export const APIS = [AnonymousOrdersAPIService, AnonymousUserAPIService, OfferAPIService, ProductAPIService, StoreAPIService, UtilAPIService];
