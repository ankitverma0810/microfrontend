import React from "react";
import { BrowserRouter } from "react-router-dom";

import MarketingApp from "./components/MarketingApp";
import Header from './components/Header';

// APP component
export default () => {
	return (
		<BrowserRouter>
			<div>
				<Header />
				<MarketingApp />
			</div>
		</BrowserRouter>
	);
};
