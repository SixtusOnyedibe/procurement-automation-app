export interface Product {
  productid: string;
  productname: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Order {
  orderId: string;
  orderDate: string;
  orderStatus: string;
  product: Product;
  paymentmethod: string;
  totalamount: number;
}

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
