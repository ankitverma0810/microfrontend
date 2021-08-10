import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

const mount = (el) => {
	const app = createApp(Dashboard);
	app.mount(el);
};

// Context/Suitation #1
// If we are running this file in development in isolation
// We are using our local index.html file
// Which definetly has an element with an id of 'dev-products'
if (process.env.NODE_ENV === "development") {
	const el = document.querySelector("#_dashboard-dev-root");
	if (el) {
		mount(el);
	}
}

// Context/Suitation #2
// If we are running this file in development or production
// We will use container application index.html file
// No guarantee that an element with an id of 'dev-products' exists
export { mount };
