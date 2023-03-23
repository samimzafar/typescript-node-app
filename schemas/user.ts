import Joi from "joi";
export const userSchemas = {
  create: Joi.object({
    phoneNumber: Joi.string().allow(null).required(),
    country: Joi.string().allow(null).required(),
  }),
};
