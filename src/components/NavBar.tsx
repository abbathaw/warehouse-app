import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className="nav-bar">
      <Link className="nav-link" to={'/'}>
        <div className="nav-item">
          <h1>The Warehouse</h1>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
