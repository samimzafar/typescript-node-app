function CardDetailsRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  leftLabel: string;
  leftValue: string | number | JSX.Element;
  rightLabel?: string;
  rightValue?: string | number | JSX.Element;
}) {
  return (
    <div className="d-flex pt-1">
      <div className="w-50">
        <span className="text-secondary">{leftLabel}</span>
        <span className="ms-3">{leftValue}</span>
      </div>
      <div className="w-50">
        <span className="text-secondary">{rightLabel}</span>
        <span className="ms-3">{rightValue}</span>
      </div>
    </div>
  );
}

export default CardDetailsRow;
