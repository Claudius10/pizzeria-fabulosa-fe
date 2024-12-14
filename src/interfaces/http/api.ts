export interface ResponseDTO {
  timeStamp: string;
  status: StatusDTO;
  error: ErrorDTO;
  payload: any | null;
}

interface StatusDTO {
  description: string;
  code: number;
}

interface ErrorDTO {
  cause: string;
  message: string;
  origin: string;
  logged: boolean;
}
