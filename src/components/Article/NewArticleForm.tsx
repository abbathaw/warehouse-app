import React, { useState } from 'react';
import { IArticle } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import NumberIncrementInput from '../Form/NumberIncrementInput.tsx';

interface ICreateArticle {
  handleSubmit: (article: Omit<IArticle, 'id'>) => void;
  handleCancel: () => void;
  isSubmitting: boolean;
  errorMsg: string;
}
const NewArticleForm = ({ handleSubmit, handleCancel, isSubmitting, errorMsg }: ICreateArticle) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
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

  const submitData = () => {
    if (!name) {
      setError('Please add a name');
    }
    if (!error && name) {
      handleSubmit({ name, amountInStock: amount });
    }
  };
  return (
    <form className="form">
      <div className="form-row">
        <div>
          <label className="label" htmlFor="inventoryNameInput">
            Item name
          </label>
        </div>
        <input
          id="inventoryNameInput"
          className="row-input"
          type="text"
          value={name}
          onChange={updateName}
          placeholder="Name"
        />
      </div>
      <div className="form-row">
        <label className="label">Stock amount</label>
        <NumberIncrementInput updateAmount={setAmount} amount={amount} updateError={setError} placeholder="Number" />
      </div>
      <div className="error-row">
        {(error || errorMsg) && <div className="error-message">{error ? error : errorMsg}</div>}
      </div>
      <div className="button-group">
        <button className={'button primary'} disabled={isSubmitting || error !== ''} onClick={submitData} type="button">
          {isSubmitting ? (
            <FontAwesomeIcon className={`action-icon ${isSubmitting && 'spinner'}`} icon={faSpinner} title="Add" />
          ) : (
            <span>Add item </span>
          )}
        </button>
        <button className={'button secondary'} onClick={handleCancel}>
          <span>Cancel </span>
        </button>
      </div>
    </form>
  );
};

export default NewArticleForm;
