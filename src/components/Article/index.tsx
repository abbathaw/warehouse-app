import { useState } from 'react';
import ViewArticle from './ViewArticle.tsx';
import EditArticle from './EditArticle.tsx';
import { IArticle } from '../../types';

const Article = ({ article }: { article: IArticle }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEdit = () => {
    console.log('editing');
    setIsSubmitting(false);
    setIsEditMode(true);
  };

  const handleEditSubmit = (article: IArticle) => {
    console.log('editing submitting', article.name);
    setIsSubmitting(true);
    setIsEditMode(true);
  };

  const handleEditCancel = () => {
    console.log('editing cancel');
    setIsEditMode(false);
  };
  const handleDelete = () => {
    console.log('delete');
  };

  return isEditMode ? (
    <EditArticle
      article={article}
      handleCancel={handleEditCancel}
      handleSubmit={handleEditSubmit}
      isSubmitting={isSubmitting}
    />
  ) : (
    <ViewArticle article={article} handleEdit={handleEdit} handleDelete={handleDelete} />
  );
};

export default Article;
