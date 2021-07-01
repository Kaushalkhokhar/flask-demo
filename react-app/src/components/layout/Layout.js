import { Fragment } from "react";
import MainHeader from "./MainHeader";

const Layout = (props) => {
    return (
    <Fragment> 
        <MainHeader />
        <div>{props.children}</div>
    </Fragment>
    )
}

export default Layout