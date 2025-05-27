export interface ServerError {
  status: number;
  code: string;
  message: string;
}

export interface FieldError {
  code: string;
  property: string;
  message: string;
  rejectedValue: any;
  path: string;
}

export interface ValidationError extends ServerError {
  code: "VALIDATION_FAILED";
  fieldErrors: FieldError[];
}

export type ApiError = ServerError | ValidationError;
