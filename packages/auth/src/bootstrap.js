import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

// onNavigate: will receive from the parent application
// defaultHistory: will receive from the application itself.
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
	// if we are ruuning our application in isolation then use browserHistory else memoryHistory
	const history =
		defaultHistory ||
		createMemoryHistory({
			initialEntries: [initialPath],
		});

	// if any changes happened in the auth app then we are passing the same to container app
	// syncing memory and browser history
	if (onNavigate) {
		history.listen(onNavigate);
	}

	ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

	// will pass this object to the host application so that they can sync browser and memory history
	return {
		// destructuing and renaming "pathname" to "nextPathname" from the location argument
		onParentNavigate({ pathname: nextPathname }) {
			// current path inside auth application
			const { pathname } = history.location;

			if (pathname !== nextPathname) {
				history.push(nextPathname);
			}
		},
	};
};

// Context/Suitation #1
// If we are running this file in development in isolation
// We are using our local index.html file
// Which definetly has an element with an id of 'dev-products'
if (process.env.NODE_ENV === "development") {
	const el = document.querySelector("#_auth-dev-root");
	if (el) {
		mount(el, { defaultHistory: createBrowserHistory() });
	}
}

// Context/Suitation #2
// If we are running this file in development or production
// We will use container application index.html file
// No guarantee that an element with an id of 'dev-products' exists
export { mount };
