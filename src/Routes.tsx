import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";
import OrphanagesDashboard from "./pages/Dashboard/Orphanages";
import DashboardAbout from "./pages/Dashboard/About";
import themeContext from "./userTheme";
const Routes = () => {
    return (
        <themeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <Router>
                    <Switch>
                        <PrivateRoute
                            path="/admin"
                            exact
                            component={Dashboard}
                        />
                        <PrivateRoute
                            path="/admin/orphanages"
                            exact
                            component={OrphanagesDashboard}
                        />
                        <PrivateRoute
                            path="/admin/about"
                            theme={{ theme, toggleTheme }}
                            component={DashboardAbout}
                        />
                        <Route path="/" exact component={Landing} />
                        <PublicRoute path="/auth" component={Auth} />
                        <Route
                            path="/orphanages"
                            exact
                            component={OrphanagesMap}
                        />
                        <Route
                            path="/orphanages/create"
                            component={CreateOrphanage}
                        />
                        <Route path="/orphanages/:id" component={Orphanage} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            )}
        </themeContext.Consumer>
    );
};

export default Routes;
