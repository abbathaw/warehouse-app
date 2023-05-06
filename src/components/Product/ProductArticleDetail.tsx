import useGetArticle from '../../hooks/useGetArticle.tsx';

interface IProductArticleDetail {
  articleId: string;
  amount: number;
}

const ProductArticleDetail = ({ articleId, amount }: IProductArticleDetail) => {
  const { data, isLoading, isError } = useGetArticle(articleId);

  if (isLoading) {
    return <div>Loading article details</div>;
  }

  if (isError) {
    return <div>Article with id {articleId} failed to load</div>;
  }

  return (
    <div>
      <div>
        {data?.name} - Quantity {amount}
      </div>
    </div>
  );
};

export default ProductArticleDetail;
