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
  cause: string;
  message: string | null;
  origin: string;
  path: string;
  logged: boolean;
  fatal: boolean;
}
