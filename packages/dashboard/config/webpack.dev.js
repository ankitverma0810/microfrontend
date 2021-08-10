const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const devConfig = {
	mode: "development",
	output: {
		// setting public path so that resources should get downloaded properly when we are on nested routes
		// will prepend 'http://localhost:8083/' in index.html to load JS files if we are on nested route eg auth/signin.
		publicPath: "http://localhost:8083/",
	},
	devServer: {
		port: 8083,
		historyApiFallback: true,
		// enabling CORS
		// for loading fonts when running the application inside the container/host
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "dashboard",
			filename: "remoteEntry.js",
			exposes: {
				"./DashboardApp": "./src/bootstrap",
			},
			shared: packageJson.dependencies,
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
