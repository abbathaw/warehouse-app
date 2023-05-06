import { useQuery } from '@tanstack/react-query';
import { IProduct } from '../types';
import { getProducts, PRODUCTS_QUERY_KEY } from '../api/products';
import Loading from '../components/Loading.tsx';
import Error from '../components/Error.tsx';
import Product from '../components/Product';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery<IProduct[]>({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: async () => {
      const axiosResponse = await getProducts();
      return axiosResponse.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  function handleNewProduct() {
    navigate('/products/new');
  }

  return (
    <div>
      <div className="button-group">
        <button className={'button primary'} onClick={handleNewProduct}>
          Add new Product
        </button>
      </div>
      <div className="table-row table-header">
        <div>Name</div>
        <div>Contents</div>
        <div>Actions</div>
      </div>
      {data?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
