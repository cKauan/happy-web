import React, { useState } from "react";
import Login from "../../pages/Auth";
import { Redirect, Route } from "react-router-dom";
import userAuth from "../../userAuth";

const PrivateRoute = (props: any) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const setLogged = () => {
        setIsLogged(true);
    };
    return (
        <userAuth.Consumer>
            {({ isLogged, setLogged }) => {
                console.log(isLogged);
                return isLogged ? (
                    <Route {...props} />
                ) : (
                    <Redirect to="/auth" />
                );
            }}
        </userAuth.Consumer>
    );
};
export default PrivateRoute;
