import { useState } from 'react';
import ModalContainer from '../Modal';
import NewArticleForm from './NewArticleForm.tsx';
import useCreateMutation from '../../hooks/useCreateMutation.tsx';
import { ARTICLES_QUERY_KEY, createArticle } from '../../api/articles';
import { IArticleInput } from '../../types';
import { toast } from 'react-toastify';

const CreateArticle = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const { createMutation, apiError } = useCreateMutation<IArticleInput>({
    queryKey: ARTICLES_QUERY_KEY,
    mutationFn: createArticle,
  });

  const handleSubmit = (article: IArticleInput) => {
    createMutation.mutate(article, {
      onSuccess: () => {
        setShowAddModal(false);
        toast.success('New item added');
      },
      onError: () => {
        toast.error('Failed to create new item');
      },
    });
  };

  return (
    <>
      <div className="button-group">
        <button className={'button primary'} onClick={() => setShowAddModal(true)}>
          Add new item
        </button>
      </div>

      <ModalContainer isModalOpen={showAddModal} setIsModalOpen={setShowAddModal} title={'Add new inventory item'}>
        <NewArticleForm
          handleSubmit={handleSubmit}
          handleCancel={() => setShowAddModal(false)}
          isSubmitting={createMutation.isLoading}
          errorMsg={apiError}
        />
      </ModalContainer>
    </>
  );
};

export default CreateArticle;
