export interface ResponseDTO {
  timeStamp: string;
  statusCode: number;
  statusDescription: string;
  errorClass: string | null;
  errorMessage: string | null;
  errorOrigin: string | null;
  payload: any | null;
}
