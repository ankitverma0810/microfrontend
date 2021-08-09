import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "auth/AuthApp";

export default ({ onSignIn }) => {
	const ref = useRef(null);
	// copy of the browser history object used in the container application
	const history = useHistory();

	useEffect(() => {
		/* syncing browser and memory history objects  */
		const { onParentNavigate } = mount(ref.current, {
			initialPath: history.location.pathname,
			/**
			 * if any route gets changed in the remote/child application then will update container/host application.
			 * destructuing and renaming "pathname" to "nextPathname" from the location argument
			 */
			onNavigate: ({ pathname: nextPathname }) => {
				// current path inside container application
				const { pathname } = history.location;

				if (pathname !== nextPathname) {
					history.push(nextPathname);
				}
			},
			onSignIn: () => {
				onSignIn();
			},
		});

		// if any route gets changed in the container/host application then will inform the remote/child aplications.
		history.listen(onParentNavigate);
	}, []);

	return <div ref={ref} />;
};
