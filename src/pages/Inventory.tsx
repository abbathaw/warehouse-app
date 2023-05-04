import { BASE_URL, inventoryAPI } from '../api/endpoints.ts';
import useSWR from 'swr';
import Loading from '../components/Loading.tsx';
import Error from '../components/Error.tsx';
import Article from '../components/Article';
import { IArticle } from '../types';

const Inventory = () => {
  const { data, error, isLoading } = useSWR<IArticle[]>(`${BASE_URL}${inventoryAPI()}`);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <div className="button-group">
        <button className={'button primary'}>Add new item</button>
      </div>
      <div className="table-row table-header">
        <div>Name</div>
        <div>Quantity</div>
        <div>Actions</div>
      </div>
      {data?.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default Inventory;
