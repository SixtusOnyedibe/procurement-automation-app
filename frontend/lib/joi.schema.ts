import Joi from 'joi';

export const orderSchema = Joi.object({
  customerid: Joi.number().required(),
  customername: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  product: Joi.object({
    productid: Joi.string().required(),
    productname: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
  }).required(),
  paymentmethod: Joi.string().required(),
  totalamount: Joi.number().required(),
});
