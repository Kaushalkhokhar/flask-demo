import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import useSendData from "../../hooks/use-sendData";

import classes from './ResetConfPassword.module.css'

const ResetPassword = (props) => {
    const {
        enteredValue: passwordInputValue,
        isTouched: passwordIsTouched,
        deFocused: passwordDeFocused,
        // inputIsValid: passwordValueIsValid,
        // errorResponse: passwordErrorResponse,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
      } = useInput();
    
      const {
        inputIsValid: passwordInputIsValid,
        errorResponse: passwordErrorResponse,
        sendInput,
      } = useSendData();
    
      const { onPassPasswordData: passPasswordData } = props;
    
      useEffect(() => {
        if(!passwordIsTouched){
          return
        }
        const identifier = setTimeout(() => {
          sendInput("/login", "password", passwordInputValue);
        }, 500);
        return () => {
          clearTimeout(identifier);
        };
      }, [passwordIsTouched, passwordInputValue, sendInput]);
    
      useEffect(()=>{
        passPasswordData({passwordInputValue, passwordInputIsValid});
      },[passPasswordData, passwordInputValue, passwordInputIsValid])

  return (
    <div className={classes["form-control"]}>
      <label htmlFor="password">Enter password</label>
      <input
        type="password"
        id="password"
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        value={passwordInputValue}
        placeholder="Your Password"
      />
      {passwordErrorResponse && !passwordDeFocused && (
        <p className={classes["info-text"]}>{passwordErrorResponse}</p>
      )}
      {passwordErrorResponse && passwordDeFocused && (
        <p className={classes["error-text"]}>{passwordErrorResponse}</p>
      )}
    </div>
  );
};

export default ResetPassword;
