import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IArticle, IProduct, IProductArticle } from '../../types';
import { createProduct, PRODUCTS_QUERY_KEY } from '../../api/products';
import { ARTICLES_QUERY_KEY, getArticles } from '../../api/articles';
import useCreateMutation from '../../hooks/useCreateMutation.tsx';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { data: articlesList } = useQuery<IArticle[]>({
    queryKey: [ARTICLES_QUERY_KEY],
    queryFn: async () => {
      const axiosResponse = await getArticles();
      return axiosResponse.data;
    },
  });

  const [name, setName] = useState('');
  const [articleInputs, setArticleInputs] = useState<IProductArticle[]>([]);
  const [error, setError] = useState('');

  const { createMutation, apiError } = useCreateMutation<Omit<IProduct, 'id'>>({
    queryKey: PRODUCTS_QUERY_KEY,
    mutationFn: createProduct,
  });

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setName(newValue);
    if (newValue.trim() === '') {
      setError('Name cannot be blank');
      return;
    }
    setError('');
  };

  const handleAddArticle = () => {
    setArticleInputs([...articleInputs, { id: '', amountRequired: 1 }]);
  };

  const handleArticleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    type: 'id' | 'amountRequired',
  ) => {
    const newArticleInputs = [...articleInputs];
    const updatedValue = type === 'id' ? event.target.value : parseInt(event.target.value);

    newArticleInputs[index] = {
      ...newArticleInputs[index],
      [type]: updatedValue,
    };
    setArticleInputs(newArticleInputs);
  };

  const isSubmitting = createMutation.isLoading;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) {
      setError('Please add a name');
      return;
    }
    if (!error && name) {
      const articles = articleInputs.filter((input) => input.id !== '');
      createMutation.mutate(
        { name, articles },
        {
          onSuccess: () => {
            toast.success('New product added');
            navigate('/products');
          },
          onError: () => {
            toast.error('Failed to create new product');
          },
        },
      );
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="productNameInput">
            Product name
          </label>
        </div>
        <input
          id="productNameInput"
          className="row-input"
          type="text"
          value={name}
          onChange={updateName}
          placeholder="Name"
        />
      </div>
      <div className="form-row">
        <button className={'button secondary'} type="button" onClick={handleAddArticle}>
          <span>Add article</span>
        </button>
      </div>
      {articleInputs.map((input, index) => (
        <div key={index}>
          <div className="form-row">
            <label className="label" htmlFor={`articles-${index}`}>
              Choose an article:
            </label>
            <select
              name={`articles-${index}`}
              id={`articles-${index}`}
              className="select-options"
              value={input.id}
              onChange={(event) => handleArticleChange(event, index, 'id')}
            >
              <option value="">Select an article</option>
              {articlesList?.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="label" htmlFor={`amountRequired-${index}`}>
              Amount required
            </label>
            <input
              id={`amountRequired-${index}`}
              className="row-input"
              type="number"
              value={input.amountRequired}
              onChange={(event) => handleArticleChange(event, index, 'amountRequired')}
              min="1"
              step="1"
            />
          </div>
        </div>
      ))}
      <div className="error-row">
        {(error || apiError) && <div className="error-message">{error ? error : apiError}</div>}
      </div>
      <div className="button-group">
        <button className={'button primary'} disabled={isSubmitting || error !== ''} type="submit">
          {isSubmitting ? (
            <FontAwesomeIcon className={`action-icon ${isSubmitting && 'spinner'}`} icon={faSpinner} title="Add" />
          ) : (
            <span>Create product</span>
          )}
        </button>
        <button className={'button secondary'} type="button" onClick={handleCancel}>
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;
