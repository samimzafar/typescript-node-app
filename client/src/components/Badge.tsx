function Badge({
  text,
  backgroundColor,
}: {
  text: string;
  backgroundColor: string;
}) {
  return (
    <span className="badge-container" style={{ backgroundColor }}>
      {text}
    </span>
  );
}

export default Badge;
