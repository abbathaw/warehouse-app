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
