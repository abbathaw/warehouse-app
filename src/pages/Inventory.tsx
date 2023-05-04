import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading.tsx';
import Error from '../components/Error.tsx';
import Article from '../components/Article';
import { IArticle } from '../types';
import { ARTICLES_QUERY_KEY, getArticles } from '../api/articles';
import CreateArticle from '../components/Article/CreateArticle.tsx';

const Inventory = () => {
  const { isLoading, error, data } = useQuery<IArticle[]>({
    queryKey: [ARTICLES_QUERY_KEY],
    queryFn: async () => {
      const axiosResponse = await getArticles();
      return axiosResponse.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <CreateArticle />
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
