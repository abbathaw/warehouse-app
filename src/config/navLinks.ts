import { faHome, faWarehouse, faBoxOpen, faChartLine } from '@fortawesome/free-solid-svg-icons';

export const getNavLinks = () => {
  return [
    {
      link: '/',
      icon: faHome,
      label: 'Home',
    },
    {
      link: '/inventory',
      icon: faWarehouse,
      label: 'Inventory',
    },
    {
      link: '/products',
      icon: faBoxOpen,
      label: 'Products',
    },
    {
      link: '/sales',
      icon: faChartLine,
      label: 'Sales',
    },
  ];
};

export const getPageTitleByPath = (path: string) => {
  let pageTitle;

  switch (path) {
    case '/':
      pageTitle = 'Home';
      break;
    case '/products':
      pageTitle = 'Products';
      break;
    case '/inventory':
      pageTitle = 'Inventory';
      break;
    case '/sales':
      pageTitle = 'Sales';
      break;
    default:
      pageTitle = '';
  }
  return pageTitle;
};
