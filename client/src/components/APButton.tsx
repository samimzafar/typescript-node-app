function Button({
  children,
  onClick,
  className,
  disabled,
}: {
  children: JSX.Element | string | any[];
  onClick?: (event: any) => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={`btn-ap-custom ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
