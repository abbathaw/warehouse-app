import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { getNavLinks } from '../../config/navLinks.ts';
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <Link to={'/'}>
          <h1>The Warehouse</h1>
        </Link>
      </div>
      <nav className="menu">
        {getNavLinks().map((navLink) => (
          <Link key={navLink.link} to={navLink.link}>
            <FontAwesomeIcon icon={navLink.icon} />
            {navLink.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
