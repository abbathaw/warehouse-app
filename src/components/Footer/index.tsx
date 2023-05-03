import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { getNavLinks } from '../../config/navLinks.ts';

const Footer = () => {
  return (
    <footer className="footer">
      {getNavLinks().map((navLink) => (
        <Link key={navLink.link} to={navLink.link}>
          <FontAwesomeIcon icon={navLink.icon} />
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
