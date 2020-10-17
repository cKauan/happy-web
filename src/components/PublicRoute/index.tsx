import React from "react";
import { Route, Redirect } from "react-router-dom";
import userAuth from "../../userAuth";
const PublicRoute = (props: any) => {
    return (
        <userAuth.Consumer>
            {({ isLogged, setLogged }) => {
                return isLogged ? <Redirect to="/" /> : <Route {...props} />;
            }}
        </userAuth.Consumer>
    );
};
export default PublicRoute;
