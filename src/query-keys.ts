export const USER_ORDER_SUMMARY_LIST = ["user", "order", "summary"];

export function userOrderQueryKey(id: string) {
  return ["user", "order", id.toString()];
}
