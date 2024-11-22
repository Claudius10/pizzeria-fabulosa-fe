export const RESOURCE_PRODUCT_PIZZA = ["resource", "product", "pizza"];

export const USER_ADDRESS_LIST = ["user", "address", "list"];
export const USER_ORDER_SUMMARY_LIST = ["user", "order", "summary"];

export function userOrderQueryKey(id: string) {
  return ["user", "order", id.toString()];
}

export function userOrderSummaryListQueryKey(page: number, size: number) {
  return ["user", "order", "summary", page.toString(), size.toString()];
}
