import Joi from 'joi';

export const orderSchema = Joi.object({
  customerid: Joi.number().required(),
  customername: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  product: Joi.object({
    productid: Joi.string().required(),
    productname: Joi.string().required().label('Product name'),
    description: Joi.string().required().label('Product description'),
    price: Joi.number().required().label('Price'),
    quantity: Joi.number().required().label('Quantity'),
    category: Joi.string().required().label('Product category'),
  }).required(),
  paymentmethod: Joi.string().required(),
  totalamount: Joi.number().required(),
});
