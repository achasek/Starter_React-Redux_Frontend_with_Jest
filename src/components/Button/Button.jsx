const Button = ({ id, handleClick, buttonLabel }) => {
  return (
    <button id={id} onClick={handleClick}>{buttonLabel}</button>
  );
};

export default Button;