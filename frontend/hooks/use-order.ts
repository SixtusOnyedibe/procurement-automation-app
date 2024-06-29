import axios from 'axios';
import userStore from '../lib/store';
import { toast } from 'sonner';
import { NewOrder } from '@/types/order.type';
import { useRouter } from 'next/navigation';

export default function useOrder() {
  const { user } = userStore((state) => state);
  const router = useRouter();

  //   fetching all orders
  const fetchOrders = async () => {
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
        toast.error(res.data.message);
        return null;
      }
    } catch (error) {
      toast('An error occurred');
      return null;
    }
  };

  // Fetching an order
  const fetchOrder = async (orderId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/orders/${orderId}`,
        {
          params: {
            customerid: user?.customerid,
          },
        }
      );
      if (res.status === 200) {
        return res.data.order;
      } else {
        toast.error(res.data.message);
        return null;
      }
    } catch (error) {
      toast.error('An error occured');
    }
  };

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

  // Delete order
  const deleteOrder = async (orderId: string) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:3001/api/orders/${orderId}`,
        {
          params: {
            customerid: user?.customerid,
          },
        }
      );
      if (res.status === 200) {
        toast.success('Order deleted');
        router.push('/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('An error occured');
    }
  };

  return {
    fetchOrders,
    fetchOrder,
    createOrder,
    deleteOrder,
  };
}
