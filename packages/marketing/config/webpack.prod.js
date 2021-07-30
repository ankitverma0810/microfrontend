const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
	mode: "production",
	output: {
		filename: "[name].[contenthash].js",
		/* Defining public path so that url's defined inside the remoteEntry.js to load other dependencies should get update correctly */
		publicPath: "/marketing/latest/",
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "marketing",
			filename: "remoteEntry.js",
			exposes: {
				"./MarketingApp": "./src/bootstrap",
			},
			shared: packageJson.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
