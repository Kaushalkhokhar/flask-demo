import { useState, useContext } from "react";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

import classes from "./Login.module.css";

const Login = () => {
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const ctx = useContext(AuthContext);

  //   let emailNotExist = true;
  const validateEmail = (value) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // for (const user in props.currenteUsers) {
    //   if (props.currenteUsers[user].email === value) {
    //     emailNotExist = false;
    //   }
    // }
    // return re.test(value) && emailNotExist;
    return re.test(value);
  };

  const {
    enteredValue: emailValue,
    isTouched: emailIsTouched,
    deFocused: emailDeFocused,
    valueIsValid: emailValueIsValid,
    inputIsInvalid: emailInputIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(validateEmail);

  let passwordLength = 0;
  const validatePassword = (value) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    passwordLength = value.trim().length;
    return re.test(value) && passwordLength >= 8;
  };

  const {
    enteredValue: passwordValue,
    isTouched: passwordIsTouched,
    deFocused: passwordDeFocused,
    valueIsValid: passwordValueIsValid,
    inputIsInvalid: passwordInputIsInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(validatePassword);

  let formIsValid = false;

  if (emailValueIsValid && passwordValueIsValid) {
    formIsValid = true;
  }

  const sendFormData = async (data) => {
    setError(false);
    setIsSuccess(false);
    try {
      const response = await fetch("/login_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const token = await response.json();
    //   console.log(token);
      ctx.tokenHandler(token.token);
      localStorage.setItem("token", token.token)
      emailReset();
      passwordReset();
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!emailValueIsValid || passwordInputIsInvalid) {
      return;
    }
    const formData = {
      email: emailValue,
      password: passwordValue,
    };
    sendFormData(formData);
  };

  return (
    <Card className={classes.form}>
      {isSuccess && <p>You are now logged in...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={submitHandler}>
        <div className={classes["form-control"]}>
          <label htmlFor="email">Enter Email</label>
          <input
            type="text"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={emailValue}
            placeholder="Your Email"
          />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="password">Enter password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={passwordValue}
            placeholder="Your Password"
          />
        </div>
        <Button type="submit" disabled={!formIsValid}>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
