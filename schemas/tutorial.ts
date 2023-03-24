import Joi from "joi";
export const tutorialSchemas = {
 create: Joi.object({
  title: Joi.string().allow(null).required(),
  description: Joi.string().allow(null).required(),
  published: Joi.boolean().allow(null).required(),
 }),
};
