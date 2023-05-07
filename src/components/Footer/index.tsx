import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { getNavLinks } from '../../config/navLinks.ts';
import usePath from '../../hooks/usePath.tsx';

const Footer = () => {
  const currentPage = usePath();
  return (
    <footer className="footer" data-testid="footer">
      {getNavLinks().map((navLink) => (
        <Link key={navLink.link} to={navLink.link} className={navLink.link === currentPage ? 'selected' : ''}>
          <FontAwesomeIcon icon={navLink.icon} title={navLink.label} />
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
