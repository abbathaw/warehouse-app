import { useLocation } from 'react-router-dom';

const usePath = () => {
  const location = useLocation();
  const currentPagePath = location.pathname;
  const pathParts = currentPagePath.split('/')[1];

  return pathParts ? `/${pathParts}` : '/';
};

export default usePath;
