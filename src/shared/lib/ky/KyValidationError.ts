export class KyValidationError extends Error {
  constructor(responseOrErrors: Response | Array<any>, errors?: Array<any>) {
    super("Validation error");
    if (responseOrErrors instanceof Response) {
      this.response = responseOrErrors;
      this.errors = errors;
    } else {
      this.errors = responseOrErrors;
    }
  }

  response?: Response;

  errors?: Array<any>;
}
