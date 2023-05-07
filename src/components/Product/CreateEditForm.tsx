import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IArticle, IProduct, IProductArticle, IProductInput } from '../../types';
import { ARTICLES_QUERY_KEY, getArticles } from '../../api/articles';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

interface ICreateEditForm {
  product?: IProduct | undefined;
  apiError: string;
  handleSubmit: (data: IProductInput | IProduct) => void;
  isSubmitting: boolean;
}

const CreateEditForm = ({ product, handleSubmit, apiError, isSubmitting }: ICreateEditForm) => {
  const navigate = useNavigate();
  const { data: articlesList } = useQuery<IArticle[]>({
    queryKey: [ARTICLES_QUERY_KEY],
    queryFn: async () => {
      const axiosResponse = await getArticles();
      return axiosResponse.data;
    },
  });

  const [name, setName] = useState(product ? product.name : '');
  const [articleInputs, setArticleInputs] = useState<IProductArticle[]>(product ? product.articles : []);
  const [error, setError] = useState('');

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

  const handleDeleteArticle = (index: number) => {
    setArticleInputs((prevArticleInputs) => prevArticleInputs.filter((_, i) => i !== index));
  };

  const handleArticleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    type: 'id' | 'amountRequired',
  ) => {
    setError('');
    const newArticleInputs = [...articleInputs];
    let updatedValue: string | number = event.target.value;
    if (type === 'amountRequired') {
      const numericValue = parseInt(event.target.value);
      updatedValue = !isNaN(numericValue) ? numericValue : '';
    }

    newArticleInputs[index] = {
      ...newArticleInputs[index],
      [type]: updatedValue,
    };
    setArticleInputs(newArticleInputs);
  };

  const handleClickSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) {
      setError('Please add a name');
      return;
    }

    const errorChecks: string[] = [];
    articleInputs.forEach((articleInput) => {
      const numericValue = parseInt(articleInput.amountRequired.toString());
      if (isNaN(numericValue) || numericValue === 0) {
        errorChecks.push('Numeric value not defined');
      }
      if (!articleInput.id) {
        errorChecks.push('Article selection not added');
      }
    });
    if (errorChecks.length > 0) {
      setError(errorChecks.join(', '));
      return;
    }
    if (!name) {
      setError('Please add a name');
      return;
    }
    if (!error && name) {
      const articles = articleInputs.filter((input) => input.id !== '');
      if (product) {
        handleSubmit({ id: product.id, name, articles });
      } else {
        handleSubmit({ name, articles });
      }
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <form className="form" onSubmit={handleClickSubmit} role="form">
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
          <div className="form-row flex-space">
            <div>
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
            <FontAwesomeIcon
              className="action-icon"
              icon={faTimesCircle}
              onClick={() => handleDeleteArticle(index)}
              title="Cancel Edit"
            />
          </div>
          <div className="form-row">
            <label className="label" htmlFor={`amountRequired-${index}`}>
              Amount required
            </label>
            <input
              id={`amountRequired-${index}`}
              data-testid="number-input"
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
            <span>{product ? 'Update' : 'Create'} product</span>
          )}
        </button>
        <button className={'button secondary'} type="button" onClick={handleCancel}>
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};

export default CreateEditForm;
