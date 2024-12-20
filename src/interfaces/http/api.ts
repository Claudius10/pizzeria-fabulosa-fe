export interface ResponseDTO {
  timeStamp: string;
  status: StatusDTO;
  error: ErrorDTO | null;
  payload: any | null;
}

interface StatusDTO {
  description: string;
  code: number;
}

export interface ErrorDTO {
  path: string;
  origin: string;
  cause: string;
  message: string | null;
  logged: boolean;
  fatal: boolean;
}
