import classes from './Button.module.css'

const Button = (props) => {
  return (
    <button
      className={props.className || classes.button}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default Button;
