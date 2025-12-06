import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="nav-logo">RealTrust</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
          <Link to="/admin/login" className="nav-admin">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;