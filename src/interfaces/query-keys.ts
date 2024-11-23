export const RESOURCE_PRODUCT_PIZZA = ["resource", "product", "pizza"];
export const RESOURCE_PRODUCT_BEVERAGES = ["resource", "product", "beverage"];

export const USER_ADDRESS_LIST = ["user", "address", "list"];
export const USER_ORDER_SUMMARY_LIST = ["user", "order", "summary"];

export function userOrderQueryKey(id: string) {
  return ["user", "order", id.toString()];
}
