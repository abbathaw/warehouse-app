import { useState } from 'react';
import ViewArticle from './ViewArticle.tsx';
import EditArticleForm from './EditArticleForm.tsx';
import { IArticle } from '../../types';
import { ARTICLES_QUERY_KEY, deleteArticle, editArticle } from '../../api/articles';
import useEditMutation from '../../hooks/useEditMutation.tsx';
import { toast } from 'react-toastify';
import useDeleteMutation from '../../hooks/useDeleteMutation.tsx';
import useGetArticle from '../../hooks/useGetArticle.tsx';

interface IArticleComponent {
  article: IArticle;
}

const Article = ({ article }: IArticleComponent) => {
  useGetArticle(article.id);
  const [isEditMode, setIsEditMode] = useState(false);

  const { editMutation, apiError } = useEditMutation({
    queryKey: ARTICLES_QUERY_KEY,
    mutationFn: editArticle,
    onSuccessCallback: () => {
      setIsEditMode(false);
      toast.success(`${article.name} Updated`);
    },
  });

  const { deleteMutation } = useDeleteMutation({
    queryKey: ARTICLES_QUERY_KEY,
    mutationFn: deleteArticle,
    onErrorCallback: () => {
      toast.error(`${article.name} could not be deleted`);
    },
    onSuccessCallback: () => {
      toast.success(`${article.name} Deleted`);
    },
  });

  const handleEditSubmit = (article: IArticle) => {
    editMutation.mutate(article);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };
  const handleEditCancel = () => {
    setIsEditMode(false);
  };
  const handleDelete = () => {
    deleteMutation.mutate(article);
  };

  return isEditMode ? (
    <EditArticleForm
      article={article}
      handleCancel={handleEditCancel}
      handleSubmit={handleEditSubmit}
      isSubmitting={editMutation.isLoading}
      errorMsg={apiError}
    />
  ) : (
    <ViewArticle
      article={article}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      isDeleting={deleteMutation.isLoading}
    />
  );
};

export default Article;
