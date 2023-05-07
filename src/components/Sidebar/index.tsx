import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { getNavLinks } from '../../config/navLinks.ts';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import usePath from '../../hooks/usePath.tsx';

const Sidebar = () => {
  const currentPage = usePath();
  return (
    <aside className="sidebar" data-testid="sidebar">
      <div className="logo-container">
        <Link to={'/'}>
          <div className="logo">
            <FontAwesomeIcon icon={faWarehouse} />
            <h1>Warehouse</h1>
          </div>
        </Link>
      </div>

      <nav className="menu">
        {getNavLinks().map((navLink) => (
          <div key={navLink.link} className={navLink.link === currentPage ? 'menu-link selected' : 'menu-link'}>
            <Link to={navLink.link}>
              <FontAwesomeIcon icon={navLink.icon} />
              {navLink.label}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
