export class ValidationErrorException {
  public message: string;
  public errors: ValidationErrorItems;

  constructor() {

  }

  toHTTPException() {
    return {
        code:
    }      
  }
}

export interface ValidationErrorItems {
  message: string;
  path: string
}
