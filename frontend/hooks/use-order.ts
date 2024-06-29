import axios from 'axios';
import userStore from '../lib/store';
import { toast } from 'sonner';

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
  return {
    fetchOrders,
  };
}
