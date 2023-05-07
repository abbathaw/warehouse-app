import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ISale } from '../types';
import Loading from '../components/Loading.tsx';
import Error from '../components/Error.tsx';
import { getSales, SALES_QUERY_KEY } from '../api/sales';
import Sale from '../components/Sale';

const Sales = () => {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery<ISale[]>({
    queryKey: [SALES_QUERY_KEY],
    queryFn: async () => {
      const axiosResponse = await getSales();
      return axiosResponse.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  function handleNewSales() {
    navigate('/sales/new');
  }
  return (
    <div>
      <div className="button-group">
        <button className={'button primary'} onClick={handleNewSales}>
          Add new sale
        </button>
      </div>
      <div className="table-row table-header">
        <div>Date</div>
        <div>Products</div>
        <div>Actions</div>
      </div>
      {data?.map((sale) => (
        <Sale key={sale.id} sale={sale} />
      ))}
    </div>
  );
};

export default Sales;
