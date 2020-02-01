export class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError);
    }
  }
}

export class InvalidPropertyError extends Error {
  constructor(msg) {
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }
}

export function getErrorStatusCode({ error }) {
  return error instanceof InvalidPropertyError ||
    error instanceof RequiredParameterError
    ? 400 // Bad Request https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
    : 500; // Internal Server Error https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
}
