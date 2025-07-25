/**
 * Pizzeria Business API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CustomerDTO } from './customerDTO';
import { OrderDetailsDTO } from './orderDetailsDTO';
import { CartDTO } from './cartDTO';


export interface CreatedOrderDTO { 
    id: number;
    formattedCreatedOn: string;
    customer?: CustomerDTO;
    address: string;
    orderDetails: OrderDetailsDTO;
    cart: CartDTO;
}

