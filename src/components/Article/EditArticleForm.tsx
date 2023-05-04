import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IArticle } from '../../types';
import NumberIncrementInput from '../Form/NumberIncrementInput.tsx';

interface IEditArticle {
  article: IArticle;
  handleSubmit: (article: IArticle) => void;
  handleCancel: () => void;
  isSubmitting: boolean;
  errorMsg: string;
}
const EditArticleForm = ({ article, handleCancel, handleSubmit, isSubmitting, errorMsg }: IEditArticle) => {
  const [name, setName] = useState(article.name);
  const [amount, setAmount] = useState(article.amountInStock);
  const [error, setError] = useState('');

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.trim() === '') {
      setError('Name cannot be blank');
      return;
    }
    setError('');
    setName(newValue);
  };

  const submitData = () => {
    const isNothingUpdated = name === article.name && amount === article.amountInStock;
    if (isNothingUpdated) {
      handleCancel();
      return;
    }
    if (!error) {
      handleSubmit({ ...article, name, amountInStock: amount });
    }
  };

  return (
    <div className="table-row">
      <div className="row-name-icon">
        <img
          alt="icon"
          src={`https://api.dicebear.com/6.x/icons/svg?size=32&radius=50&chars=1&backgroundColor=ffda1a&icon=pencil`}
        />
        <div>
          <input className="row-input" type="text" value={name} onChange={updateName} />
        </div>
      </div>
      <NumberIncrementInput updateAmount={setAmount} amount={amount} updateError={setError} />

      <div className="action-icons">
        <FontAwesomeIcon
          className={`action-icon ${isSubmitting && 'spinner'}`}
          icon={isSubmitting ? faSpinner : faCheckCircle}
          onClick={submitData}
          style={{ cursor: isSubmitting || error ? 'not-allowed' : 'pointer' }}
          title="Submit Edit"
        />
        <FontAwesomeIcon className="action-icon" icon={faTimesCircle} onClick={handleCancel} title="Cancel Edit" />
      </div>
      <div className="extra-info-row">
        {(error || errorMsg) && <div className="error-message">{error ? error : errorMsg}</div>}
      </div>
    </div>
  );
};

export default EditArticleForm;
