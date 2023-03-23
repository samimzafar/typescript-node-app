function CustomStatusBadge({
  status,
  badgeClass,
  onClick,
  icon,
  ref,
}: {
  status: string;
  badgeClass: string;
  onClick?: (e?: any) => void;
  icon?: JSX.Element;
  ref?: React.LegacyRef<HTMLAnchorElement>;
}) {
  return (
    <span onClick={onClick} className={`status-badge ${badgeClass}`}>
      {status} {icon}
    </span>
  );
}

export default CustomStatusBadge;
