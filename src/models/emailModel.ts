interface emailModel {
  emailAddress: string;
  name: string;
  subject: string;
  message: string;
}

export function isEmailModel(arg: any): arg is emailModel {
  if (typeof arg.emailAddress !== "string")
    throw "emailAddress is not a string";
  if (typeof arg.name !== "string") throw "name is not a string";
  if (typeof arg.subject !== "string") throw "subject is not a string";
  if (typeof arg.message !== "string") throw "message is not a string";
  return true;
}

export default emailModel;
