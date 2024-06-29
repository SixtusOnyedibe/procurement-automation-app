import axios from 'axios';
import userStore from '../lib/store';
import { toast } from 'sonner';
import { NewOrder } from '@/types/order.type';

export default function useOrder() {
  const { user } = userStore((state) => state);

  //   fetching orders
  async function fetchOrders() {
    const userEmail = user?.email;
    try {
      const res = await axios.get('http://localhost:3001/api/orders', {
        params: {
          email: userEmail,
        },
      });

      if (res.status === 200) {
        return res.data.orders;
      } else {
        toast(res.data.message);
        return null;
      }
    } catch (error) {
      toast('An error occurred');
      return null;
    }
  }

  // Creating Orders
  const createOrder = async (form: NewOrder) => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.post(`http://localhost:3001/api/orders/`, {
        ...form,
        customername: user?.username,
        customerid: user?.customerid,
        email: user?.email,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return {
    fetchOrders,
    createOrder,
  };
}
