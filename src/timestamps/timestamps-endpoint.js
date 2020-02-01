const { makeHttpError } = require("../helpers/http-error");

export function makeTimestampEndpointHandler(makeTimestamp) {
  return async function handle(httprequest) {
    if (httprequest.method !== "GET") {
      return makeHttpError({
        statusCode: 405,
        errorMessage: `${httprequest.method} method not allowed.`
      });
    }

    let result;
    try {
      const result = getTimestamp(httprequest);
      return result;
    } catch (error) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: error.message
      });
    }
  };

  function getTimestamp(httpRequest) {
    const { dateString } = httpRequest.pathParams;
    const result = makeTimestamp(dateString);

    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: JSON.stringify(result)
    };
  }
}
