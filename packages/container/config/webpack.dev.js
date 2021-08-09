const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const devConfig = {
	mode: "development",
	output: {
		// setting public path so that resources should get downloaded properly when we are on nested routes
		publicPath: "http://localhost:8080/",
	},
	devServer: {
		port: 8080,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container",
			remotes: {
				marketing: "marketing@http://localhost:8081/remoteEntry.js",
				auth: "auth@http://localhost:8082/remoteEntry.js",
			},
			shared: packageJson.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
