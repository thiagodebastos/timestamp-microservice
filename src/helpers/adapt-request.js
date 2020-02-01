/**
 * Captures data from Express request to be processed/interpreted by this application
 * @param {import('express').Request} req - Express Request object
 */
export function adaptRequest(req) {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body
  });
}
