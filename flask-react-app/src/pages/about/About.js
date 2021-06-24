import { Fragment, useContext, useEffect } from "react";
import useGetData from "../../hooks/use-getData";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../UI/LoadingSpinner";

import Modal from "../../UI/Modal";

const About = () => {
  const ctxAuth = useContext(AuthContext)
  const {
    data,
    error,
    isLoading,
    isSuccess,
    resetState,
    fetchData,} = useGetData('/about', ctxAuth.token)

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const modalClickHandler = () => {
    resetState()
  }

  return (
    <Fragment>
      {isSuccess && <p>{data.message}</p>}
      {isLoading && <LoadingSpinner />}
      {error && (
      <Modal
        onClick={modalClickHandler}
        title={"Error Message"}
        content={error}
      />
    )}
    </Fragment>
  );
};

export default About;
