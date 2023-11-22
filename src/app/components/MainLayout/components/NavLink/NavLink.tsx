import { NavLink as RouterNavLink } from 'react-router-dom';

type NavLinkProps = {
  to: string;
  exact?: boolean;
  label: string;
  className?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ to, exact, label, className }) => (
  <RouterNavLink //
    className={className}
    activeClassName="text-blue-600"
    to={to}
    exact={exact}
  >
    {label}
  </RouterNavLink>
);

export default NavLink;
