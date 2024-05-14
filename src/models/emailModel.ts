interface emailModel {
  emailAddress: string;
  name: string;
  subject: string;
  message: string;
}

const validateEmailRegex = (emailToValidate: string) => {
  return emailToValidate.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function isEmailModel(arg: any): arg is emailModel {
  if (typeof arg.emailAddress !== "string")
    throw new ValidationError("emailAddress is not a string");
  if (!validateEmailRegex(arg.emailAddress))
    throw new ValidationError("Invalid email address");
  if (typeof arg.name !== "string")
    throw new ValidationError("name is not a string");
  if (typeof arg.subject !== "string")
    throw new ValidationError("subject is not a string");
  if (typeof arg.message !== "string")
    throw new ValidationError("message is not a string");
  return true;
}

export default emailModel;
