import { Fragment, useState, useContext, useEffect, useCallback } from "react";
import AuthContext from "../../store/auth-context";

const About = () => {
  const [error, setError] = useState(null);
  const [isSuccess, setIsSccess] = useState(null);
  const ctx = useContext(AuthContext);
  const getAbout = useCallback(async () => {
    setError(null);
    setIsSccess(false);
    try {
      const response = await fetch("/about_page", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      setIsSccess({username:data.username, email:data.email});
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    getAbout();
  }, [getAbout]);

  return (
    <Fragment>
      <p>{ctx.token}</p>
      {isSuccess && <p>{isSuccess.email}</p>}
      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default About;
