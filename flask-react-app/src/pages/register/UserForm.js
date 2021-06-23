import { useCallback, useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Username from "./Username";
import Email from "./Email";
import Password from "./Password";
import ConfPassword from "./ConfPassword";

import classes from "./UserForm.module.css";

const UserForm = (props) => {
  const [usernameData, setUsernameData] = useState({});
  const [emailData, setEmailData] = useState({});
  const [passwordData, setPasswordData] = useState({});
  const [confPasswordData, setConfPasswordData] = useState({});

  const passNameData = useCallback((nameReset, nameInputIsValid) => {
    setUsernameData({
      nameReset,
      nameInputIsValid,
    });
  }, []);

  const passEmailData = useCallback((emailReset, emailInputIsValid) => {
    setEmailData({
      emailReset,
      emailInputIsValid,
    });
  }, []);

  const passPasswordData = useCallback(
    (passwordInputValue, passwordReset, passwordInputIsValid) => {
      setPasswordData({
        passwordInputValue,
        passwordReset,
        passwordInputIsValid,
      });
    },
    []
  );

  const passConfPasswordData = useCallback(
    (confPasswordReset, confPasswordInputIsValid) => {
      setConfPasswordData({
        confPasswordReset,
        confPasswordInputIsValid,
      });
    },
    []
  );

  let formIsValid = false;

  if (
    usernameData.nameInputIsValid &&
    emailData.emailInputIsValid &&
    passwordData.passwordInputIsValid &&
    confPasswordData.confPasswordInputIsValid
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    //  This needs only if we not disable submit button
    // if (
    //   !usernameData.nameInputIsValid ||
    //   !emailData.emailInputIsValid ||
    //   !passwordData.passwordInputIsValid ||
    //   !confPasswordData.confPasswordInputIsValid
    // ) {
    //   return;
    // }

    const resetAll = () => {
      usernameData.nameReset();
      emailData.emailReset();
      passwordData.passwordReset();
      confPasswordData.confPasswordReset();
    };

    props.onAddUser(resetAll);
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={onSubmitHandler}>
        <Username onPassNameData={passNameData} />
        <Email onPassEmailData={passEmailData} />
        <Password onPassPasswordData={passPasswordData} />
        <ConfPassword
          onPassConfPasswordData={passConfPasswordData}
          passwordInputValue={passwordData.passwordInputValue}
        />
        <Button disabled={!formIsValid} type="submit">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default UserForm;
