import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import React from 'react';

interface INumberForm {
  amount: number;
  updateAmount: (val: number | ((prevAmount: number) => number)) => void;
  updateError: (msg: string) => void;
  placeholder?: string;
}
const NumberIncrementInput = ({ amount, updateAmount, updateError, placeholder }: INumberForm) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue < 0) {
      updateError('Amount should not be below zero');
      return;
    }
    updateError('');
    updateAmount(newValue);
  };

  const incrementAmount = () => {
    updateAmount((prevAmount) => prevAmount + 1);
  };

  const decrementAmount = () => {
    if (amount > 0) {
      updateAmount((prevAmount) => prevAmount - 1);
    }
  };

  return (
    <div className="amount-input-container">
      <FontAwesomeIcon className="action-icon" icon={faMinusSquare} onClick={decrementAmount} title="Add 1" />
      <input className="row-input" type="number" value={amount} onChange={handleChange} placeholder={placeholder} />
      <FontAwesomeIcon className="action-icon" icon={faPlusSquare} onClick={incrementAmount} title="Subtract 1" />
    </div>
  );
};

export default NumberIncrementInput;
