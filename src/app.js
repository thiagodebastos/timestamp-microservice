import express from "express";

import { timeStampEndpointHandler } from "./timestamps";
import { adaptRequest } from "./helpers/adapt-request";
import { PORT } from "./config";

const app = express();

app.get("/", (_req, res) => res.send("Hello World"));
app.get("/api/timestamp", timestampController);
app.get("/api/timestamp/:dateString", timestampController);
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));

// controllers
/**
 * Contacts Controller
 * Keep business logic out of here
 * @param {import("@types/express").Request} req
 * @param {import("@types/express").Response} res
 */
function timestampController(req, res) {
  const httpRequest = adaptRequest(req);
  timeStampEndpointHandler(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(error => {
      console.log(error);
      res.status(500).end();
    });
}

export default app;
