import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
	StylesProvider,
	createGenerateClassName,
} from "@material-ui/core/styles";

import Progress from "./components/Progress";
import Header from "./components/Header";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
	productionPrefix: "co",
});

// Reason we are creating browser history manually is because we have to use history in this component itself.
// It is challenging to use history in the same component when you have used "BrowserHistory" from react-router
const history = createBrowserHistory();

// APP component
export default () => {
	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		if (isSignedIn) {
			history.push("/dashboard");
		}
	}, [isSignedIn]);

	return (
		<StylesProvider generateClassName={generateClassName}>
			<Router history={history}>
				<div>
					<Header
						onSignOut={() => setIsSignedIn(false)}
						isSignedIn={isSignedIn}
					/>
					<Suspense fallback={<Progress />}>
						<Switch>
							<Route path="/auth">
								<AuthLazy
									onSignIn={() => setIsSignedIn(true)}
								/>
							</Route>
							<Route path="/dashboard">
								{!isSignedIn && <Redirect to="/" />}
								<DashboardLazy />
							</Route>
							<Route path="/" component={MarketingLazy} />
						</Switch>
					</Suspense>
				</div>
			</Router>
		</StylesProvider>
	);
};
