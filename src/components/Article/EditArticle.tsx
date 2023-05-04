import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faPlusSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IArticle } from '../../types';

interface IEditArticle {
  article: IArticle;
  handleSubmit: (article: IArticle) => void;
  handleCancel: () => void;
  isSubmitting: boolean;
}
const EditArticle = ({ article, handleCancel, handleSubmit, isSubmitting }: IEditArticle) => {
  const [name, setName] = useState(article.name);
  const [amount, setAmount] = useState(article.amountInStock);
  const [error, setError] = useState('');

  const updateAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue < 0) {
      setError('Amount should not be below zero');
      return;
    }
    setError('');
    setAmount(newValue);
  };

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.trim() === '') {
      setError('Name cannot be blank');
      return;
    }
    setError('');
    setName(newValue);
  };

  const incrementAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const decrementAmount = () => {
    if (amount > 0) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  const submitData = () => {
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
      <div className="amount-input-container">
        <FontAwesomeIcon className="action-icon" icon={faMinusSquare} onClick={decrementAmount} title="Add 1" />
        <input className="row-input" type="number" value={amount} onChange={updateAmount} />
        <FontAwesomeIcon className="action-icon" icon={faPlusSquare} onClick={incrementAmount} title="Subtract 1" />
      </div>
      <div className="action-icons">
        <FontAwesomeIcon
          className={`action-icon ${isSubmitting && 'spinner'}`}
          icon={isSubmitting ? faSpinner : faCheckCircle}
          onClick={submitData}
          style={{ cursor: error || isSubmitting ? 'not-allowed' : 'pointer' }}
          title="Submit Edit"
        />
        <FontAwesomeIcon className="action-icon" icon={faTimesCircle} onClick={handleCancel} title="Cancel Edit" />
      </div>
      <div className="extra-info-row">{error && <div className="error-message">{error}</div>}</div>
    </div>
  );
};

export default EditArticle;
