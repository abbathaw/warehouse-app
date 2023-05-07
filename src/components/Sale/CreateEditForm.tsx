import { IProduct, ISale, ISaleEditInput, ISaleInput } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts, PRODUCTS_QUERY_KEY } from '../../api/products';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface ICreateEditForm {
  sale?: ISale | undefined;
  apiError: string;
  handleSubmit: ({
    data,
    productList,
  }: {
    data: ISaleInput | ISaleEditInput;
    productList: IProduct[] | undefined;
  }) => void;
  isSubmitting: boolean;
}
const CreateEditForm = ({ sale, handleSubmit, apiError, isSubmitting }: ICreateEditForm) => {
  const navigate = useNavigate();
  const { data: productList } = useQuery<IProduct[]>({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: async () => {
      const axiosResponse = await getProducts();
      return axiosResponse.data;
    },
  });

  const [productId, setProductId] = useState(sale ? sale.productId : '');
  const [amountSold, setAmountSold] = useState<number>(sale ? sale.amountSold : 1);
  const [error, setError] = useState('');

  const handleClickSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!productId) {
      setError('Please select a product');
      return;
    }
    if (!error) {
      if (sale) {
        handleSubmit({ data: { id: sale.id, productId, amountSold }, productList });
      } else {
        handleSubmit({ data: { productId, amountSold }, productList });
      }
    }
  };

  const handleProductChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: 'id' | 'amountSold',
  ) => {
    if (type === 'id') {
      setProductId(event.target.value);
    } else {
      setAmountSold(parseInt(event.target.value));
    }
  };

  const handleCancel = () => {
    navigate('/sales');
  };

  return (
    <form className="form" onSubmit={handleClickSubmit}>
      <div className="form-row">
        <label className="label" htmlFor={`products`}>
          Choose a product:
        </label>
        <select
          name={`products`}
          id={`products`}
          className="select-options"
          value={sale?.productId}
          disabled={sale !== undefined}
          onChange={(event) => handleProductChange(event, 'id')}
        >
          <option value="">Select a product</option>
          {productList?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label className="label" htmlFor={`amountSold`}>
          Amount Sold
        </label>
        <input
          id={`amountSold`}
          className="row-input"
          type="number"
          value={amountSold}
          onChange={(event) => handleProductChange(event, 'amountSold')}
          min="1"
          step="1"
        />
      </div>
      <div className="error-row">
        {(error || apiError) && <div className="error-message">{error ? error : apiError}</div>}
      </div>
      <div className="button-group">
        <button className={'button primary'} disabled={isSubmitting || error !== ''} type="submit">
          {isSubmitting ? (
            <FontAwesomeIcon className={`action-icon ${isSubmitting && 'spinner'}`} icon={faSpinner} title="Add" />
          ) : (
            <span>{sale ? 'Update' : 'Create'} sale</span>
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
