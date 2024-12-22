export interface ResponseDTO {
  timeStamp: string;
  status: StatusDTO;
  error: ErrorDTO | null;
  payload: any | null;
}

interface StatusDTO {
  description: string;
  code: number;
  error: boolean; // isError on the BE somehow ends up as error here
}

export interface ErrorDTO {
  id: number;
  path: string;
  origin: string;
  cause: string;
  message: string | null;
  logged: boolean;
  fatal: boolean;
}
