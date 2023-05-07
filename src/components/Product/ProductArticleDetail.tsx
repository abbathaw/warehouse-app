import useGetQuery from '../../hooks/useGetQuery.tsx';
import { ARTICLES_QUERY_KEY, getArticle } from '../../api/articles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface IProductArticleDetail {
  articleId: string;
  amount: number;
}

const ProductArticleDetail = ({ articleId, amount }: IProductArticleDetail) => {
  const { data, isLoading, isError } = useGetQuery({
    id: articleId,
    queryKey: ARTICLES_QUERY_KEY,
    queryFn: getArticle,
  });
  if (isLoading) {
    return <div>Loading article details</div>;
  }

  if (isError) {
    return (
      <div className="container">
        <div>
          <FontAwesomeIcon className={`action-icon`} icon={faCircleXmark} title="missing" color={'red'} />{' '}
          <span>Article Not found</span>{' '}
        </div>
        <div className="label">Quantity: {amount}</div>
      </div>
    );
  }

  return (
    <div className="container" data-testid="product-article-detail">
      <div>{data?.name}</div>
      <div className="label">
        <span>Quantity: {amount} </span>{' '}
        {amount > (data?.amountInStock || 0) && (
          <FontAwesomeIcon icon={faWarning} title="Low inventory" color={'orange'} />
        )}
      </div>
    </div>
  );
};

export default ProductArticleDetail;
