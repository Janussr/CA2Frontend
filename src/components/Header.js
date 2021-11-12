import { NavLink } from "react-router-dom";

function Header({ facade }) {
  console.log(facade.getUserRoles());

  return (
    <ul className="header">
      <li>
        <NavLink activeClassName="active" to="/" exact>
          Home
        </NavLink>
      </li>
      {facade.hasUserAccess("user") && (
        <li>
          <NavLink activeClassName="active" to="/user">
            user
          </NavLink>
        </li>
      )}
      <li>
        {facade.hasUserAccess("admin") && (
          <NavLink activeClassName="active" to="/admin">
            admin
          </NavLink>
        )}
      </li>
    </ul>
  );
}

export default Header;
