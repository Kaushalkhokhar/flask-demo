import { Fragment } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import Card from "./Card";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

const Overlays = (props) => {
  return (
    <Card className={classes.overlays}>
      <header>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>{props.content}</div>
      <footer>
        <Button onClick={props.onClick}>Close</Button>
      </footer>
    </Card>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlays
          title={props.title}
          content={props.content}
          onClick={props.onClick}
        />,
        document.getElementById("overlays-root")
      )}
    </Fragment>
  );
};

export default Modal;
