import { NavLink } from 'react-router-dom';

interface SubItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  to: string;
}

export const SidebarSubItem: React.FC<SubItemProps> = ({
  to,
  children,
  ...props
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
        (isActive && '!text-white')
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};
