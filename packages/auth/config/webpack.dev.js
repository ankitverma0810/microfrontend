const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const devConfig = {
	mode: "development",
	output: {
		// setting public path so that resources should get downloaded properly when we are on nested routes
		// will prepend 'http://localhost:8082/' in index.html to load JS files if we are on nested route eg auth/signin.
		publicPath: "http://localhost:8082/",
	},
	devServer: {
		port: 8082,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "auth",
			filename: "remoteEntry.js",
			exposes: {
				"./AuthApp": "./src/bootstrap",
			},
			shared: packageJson.dependencies,
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
