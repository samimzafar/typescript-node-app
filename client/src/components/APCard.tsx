function APCard({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <div className="p-4 card-container">{children}</div>;
}

export default APCard;
