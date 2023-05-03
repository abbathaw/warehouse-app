import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { getPageTitleByPath } from '../../config/navLinks.ts';
import usePath from '../../hooks/usePath.tsx';

const Header = () => {
  const currentPage = usePath();
  return (
    <header className="header">
      <h2 className="title">{getPageTitleByPath(currentPage)}</h2>
      <FontAwesomeIcon className="user-icon" icon={faCircleUser} />
    </header>
  );
};

export default Header;
