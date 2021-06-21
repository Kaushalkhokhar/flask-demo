import { useCallback, useEffect, useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Username from "./Username";
import Email from "./Email";
import Password from "./Password";
import ConfPassword from "./ConfPassword";

import classes from "./UserForm.module.css";

const UserForm = (props) => {
  const [currenteUsers, setCurrentUsers] = useState([]);
  const [usernameData, setUsernameData] = useState({});
  const [emailData, setEmailData] = useState({});
  const [passwordData, setPasswordData] = useState({});
  const [confPasswordData, setConfPasswordData] = useState({});

  const { users } = props;
  useEffect(() => {
    setCurrentUsers(users);
  }, [users]);

  const passNameData = useCallback(
    (nameInputValue, nameIsValid, nameReset, nameInputIsInvalid) => {
      setUsernameData({
        nameInputValue,
        nameIsValid,
        nameReset,
        nameInputIsInvalid,
      });
    },
    []
  );

  const passEmailData = useCallback(
    (emailInputValue, emailIsValid, emailReset, emailInputIsInvalid) => {
      setEmailData({
        emailInputValue,
        emailIsValid,
        emailReset,
        emailInputIsInvalid,
      });
    },
    []
  );

  const passPasswordData = useCallback(
    (
      passwordInputValue,
      passwordIsValid,
      passwordReset,
      passwordInputIsInvalid
    ) => {
      setPasswordData({
        passwordInputValue,
        passwordIsValid,
        passwordReset,
        passwordInputIsInvalid,
      });
    },
    []
  );

  const passConfPasswordData = useCallback(
    (
      confPasswordInputValue,
      confPasswordIsValid,
      confPasswordReset,
      confPasswordInputIsInvalid
    ) => {
      setConfPasswordData({
        confPasswordInputValue,
        confPasswordIsValid,
        confPasswordReset,
        confPasswordInputIsInvalid,
      });
    },
    []
  );

  let formIsValid = false;

  if (
    usernameData.nameIsValid &&
    emailData.emailIsValid &&
    passwordData.passwordIsValid &&
    confPasswordData.confPasswordIsValid
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (
      usernameData.nameInputIsInvalid ||
      emailData.emailInputIsInvalid ||
      passwordData.passwordInputIsInvalid ||
      confPasswordData.confPasswordInputIsInvalid
    ) {
      return;
    }

    const new_user = {
      username: usernameData.nameInputValue,
      email: emailData.emailInputValue,
      password: passwordData.passwordInputValue,
    };

    const resetAll = () => {
      usernameData.nameReset();
      emailData.emailReset();
      passwordData.passwordReset();
      confPasswordData.confPasswordReset();
    };

    props.onAddUser(new_user, resetAll);
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={onSubmitHandler}>
        <Username onPassNameData={passNameData} currenteUsers={currenteUsers} />
        <Email onPassEmailData={passEmailData} currenteUsers={currenteUsers} />
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
