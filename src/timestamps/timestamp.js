import {
  InvalidPropertyError,
  RequiredParameterError
} from "../helpers/errors";

export function buildMakeTimestamp({ dateValidator }) {
  return function makeTimestamp(dateString) {
    if (!dateString || dateString.length === 0) {
      const now = new Date();
      return {
        unix: toUnix(now),
        natural: toNatural(now)
      };
    }

    return {
      unix: toUnix(validate(dateString)),
      natural: toNatural(validate(dateString))
    };

    function validate(date) {
      // TODO: split this function up, its doing more than just validating
      const dateIsNumber = !!Number(date);

      let isValidTimestamp;

      if (dateIsNumber) {
        isValidTimestamp = new Date(Number(date));
      } else {
        // @NOTE: maybe using moment just for this is overkill
        isValidTimestamp = dateValidator(date).isValid();
      }

      if (!isValidTimestamp) {
        throw new InvalidPropertyError("Date is not a valid date");
      }

      if (dateIsNumber && isValidTimestamp) {
        return new Date(Number(date));
      }

      return new Date(date);
    }

    function toUnix(date) {
      return Date.parse(date);
    }

    function toNatural(date) {
      return date.toUTCString();
    }
  };
}
