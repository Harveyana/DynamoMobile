// import { fetcher } from '../utils/fetcher';
import useSWR,{ useSWRConfig } from 'swr';
import { useProductStore } from '@/store/useProduct';
import { useAuthStore } from '@/store/useAuth';

export function UseCart() {

  const getCart = useProductStore((state:any) => state.getCart)
  const storeId = useProductStore((state:any) => state.Store_id)

  const fetcher = async() => {
    const data = await getCart(storeId);
    console.log('usecart',data)
    if(data?.success){
      return {
        products:data.products,
        cartTotal:data.cartTotal
      }

    }else{
      return {
        products:[],
        cartTotal:0
      }
    }
  };

  const { data, error, isLoading, mutate } = useSWR(
    'cart',
    fetcher
  );

  return {
    cart: data?.products || [],
    total: data?.cartTotal || 0,
    isLoading,
    error,
    refresh:()=>{ mutate()}
  };
}