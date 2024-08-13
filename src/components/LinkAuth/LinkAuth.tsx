

const LinkAuth = ({ allowedRoles, children, user }) => {
  return user && allowedRoles.includes(user.role.name.toLowerCase()) && (
    <>{children}</>
  )
};

export default LinkAuth;
