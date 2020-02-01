import moment from "moment";
import { buildMakeTimestamp } from "./timestamp";
import { makeTimestampEndpointHandler } from "./timestamps-endpoint";

export const makeTimestamp = buildMakeTimestamp({ dateValidator: moment });

export const timeStampEndpointHandler = makeTimestampEndpointHandler(
  makeTimestamp
);
