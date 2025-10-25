export * from './incidentsAPI.service';
import { IncidentsAPIService } from './incidentsAPI.service';
export * from './orderStatisticsAPI.service';
import { OrderStatisticsAPIService } from './orderStatisticsAPI.service';
export const APIS = [IncidentsAPIService, OrderStatisticsAPIService];
