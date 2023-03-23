const WarningSVG = () => {
  return (
    <svg
      className="crossmark animateElement"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className="crossmark__circle animateElement"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className="cross__path cross__path--right animateElement"
        fill="none"
        d="M26,14 l0,20"
      />
      <path
        className="cross__path cross__path--left animateElement"
        fill="none"
        d="M26,40 l0,2"
      />
    </svg>
  );
};

export default WarningSVG;
