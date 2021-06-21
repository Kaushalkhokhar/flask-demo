import { useCallback, useEffect, useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Username from "./Username";
import Email from "./Email";
import Password from "./Password";
import ConfPassword from "./ConfPassword";

import classes from "./UserForm.module.css";

const UserForm = (props) => {
  // const [currenteUsers, setCurrentUsers] = useState([]);
  const [usernameData, setUsernameData] = useState({});
  const [emailData, setEmailData] = useState({});
  const [passwordData, setPasswordData] = useState({});
  const [confPasswordData, setConfPasswordData] = useState({});

  // const { users } = props;
  // useEffect(() => {
  //   setCurrentUsers(users);
  // }, [users]);

  const passNameData = useCallback(
    (nameInputValue, nameReset, nameInputIsValid) => {
      setUsernameData({
        nameInputValue,
        // nameIsValid,
        nameReset,
        nameInputIsValid,
      });
    },
    []
  );

  const passEmailData = useCallback(
    (emailInputValue, emailReset, emailInputIsValid) => {
      setEmailData({
        emailInputValue,
        // emailIsValid,
        emailReset,
        emailInputIsValid,
      });
    },
    []
  );

  const passPasswordData = useCallback(
    (
      passwordInputValue,
      // passwordIsValid,
      passwordReset,
      passwordInputIsValid
    ) => {
      setPasswordData({
        passwordInputValue,
        // passwordIsValid,
        passwordReset,
        passwordInputIsValid,
      });
    },
    []
  );

  const passConfPasswordData = useCallback(
    (
      confPasswordInputValue,
      // confPasswordIsValid,
      confPasswordReset,
      confPasswordInputIsValid
    ) => {
      setConfPasswordData({
        confPasswordInputValue,
        // confPasswordIsValid,
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

  console.log(formIsValid);

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
