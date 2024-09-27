import { NavLink } from 'react-router-dom';

interface ItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  to: string;
  include: string;
}

export const SidebarItem: React.FC<ItemProps> = ({
  children,
  to,
  include,
  ...props
}) => {
  const { pathname } = location;
  return (
    <NavLink
      to={to}
      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
        pathname.includes(include) && 'bg-graydark dark:bg-meta-4'
      }`}
      {...props}
    >
      {children}
    </NavLink>
  );
};
