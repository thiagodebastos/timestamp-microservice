import { InvalidPropertyError } from "./errors";
export function isValidDate({ dateString, validationLib }) {
  const isValid = validationLib(dateString).isValid;
  if (!isValid) {
    throw new InvalidPropertyError(
      `${dateString} is not a valid date: ${isValid}`
    );
  }
}
