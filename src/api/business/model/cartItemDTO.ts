/**
 * Pizzeria Business API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface CartItemDTO { 
    id?: number;
    type: string;
    price: number;
    quantity: number;
    name: { [key: string]: string; };
    description: { [key: string]: Array<string>; };
    formats: { [key: string]: { [key: string]: string; }; };
}

