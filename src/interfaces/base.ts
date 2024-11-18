// ---------- BASE QUERY ----------

import {Signal} from '@angular/core';

export interface BaseQueryResult {
  status: Signal<"error" | "success" | "pending">;
  error: Signal<Error | null>;
}

export interface BaseQueryOptions {
  queryKey: string[];
}

export interface BaseUserQueryOptions extends BaseQueryOptions {
  userId: string | undefined;
}

export interface BaseUserMutationOptions {
  userId: string | undefined;
}
