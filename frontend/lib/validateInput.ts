import { orderSchema } from './joi.schema';

export interface NewOrder {
  customerid: number;
  customername: string;
  email: string;
  product: {
    productid: string;
    productname: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
  };
  paymentmethod: string;
  totalamount: number;
}

export function validateInput(input: NewOrder) {
  const { error, value } = orderSchema.validate(input);
  return { error, value };
}
