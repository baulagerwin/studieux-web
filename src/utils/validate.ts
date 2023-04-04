import Joi from "joi";

class Validate {
  public firstName(firstName: string) {
    const schema = Joi.object({
      firstName: Joi.string().required().label("First name"),
    });

    return (
      schema
        .validate({ firstName })
        .error?.details[0].message.replace(/["]/gi, "")
        .replace("is not allowed to be empty", "is required") || ""
    );
  }

  public lastName(lastName: string) {
    const schema = Joi.object({
      lastName: Joi.string().required().label("Last name"),
    });

    return (
      schema
        .validate({ lastName })
        .error?.details[0].message.replace(/["]/gi, "")
        .replace("is not allowed to be empty", "is required") || ""
    );
  }

  public username(username: string) {
    const schema = Joi.object({
      username: Joi.string().min(6).max(55).required().label("Username"),
    });

    return (
      schema
        .validate({ username })
        .error?.details[0].message.replace(/["]/gi, "")
        .replace("is not allowed to be empty", "is required") || ""
    );
  }

  public email(email: string) {
    const schema = Joi.object({
      email: Joi.string()
        .min(6)
        .max(55)
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
    });

    return (
      schema
        .validate({ email })
        .error?.details[0].message.replace(/["]/gi, "")
        .replace("is not allowed to be empty", "is required") || ""
    );
  }

  public password(password: string) {
    const schema = Joi.object({
      password: Joi.string().min(6).max(55).required().label("Password"),
    });

    return (
      schema
        .validate({ password })
        .error?.details[0].message.replace(/["]/gi, "")
        .replace("is not allowed to be empty", "is required") || ""
    );
  }

  public notebook(notebook: string): string {
    const schema = Joi.object({
      notebook: Joi.string().min(2).max(22).required().label("Name"),
    });

    return (
      schema
        .validate({ notebook })
        .error?.details[0].message.replace(/["]/gi, "") || ""
    );
  }

  public topic(topic: string): string {
    const schema = Joi.object({
      topic: Joi.string().min(2).max(22).required().label("Name"),
    });

    return (
      schema
        .validate({ topic })
        .error?.details[0].message.replace(/["]/gi, "") || ""
    );
  }

  public question(question: string): string {
    const schema = Joi.object({
      question: Joi.string().min(5).max(70).required().label("Question"),
    });

    return (
      schema
        .validate({ question })
        .error?.details[0].message.replace(/["]/gi, "") || ""
    );
  }

  public answer(answer: string): string {
    const schema = Joi.object({
      answer: Joi.string().min(5).max(610).required().label("Answer"),
    });

    return (
      schema
        .validate({ answer })
        .error?.details[0].message.replace(/["]/gi, "") || ""
    );
  }
}

export default new Validate();
