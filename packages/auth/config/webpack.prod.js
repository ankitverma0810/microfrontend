const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
	mode: "production",
	output: {
		filename: "[name].[contenthash].js",
		/* Defining public path so that url's defined inside the remoteEntry.js to load other dependencies should get update correctly */
		/* path should be same where we are placing our marketing files in the S3 bucket */
		/* please refer marekting.yml file. aws cloudfront create-invalidation --distribution-id ${{ secrets.AWS_DISTRIBUTION_ID }} --paths "/marketing/latest/remoteEntry.js" */
		publicPath: "/auth/latest/",
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
	],
};

module.exports = merge(commonConfig, prodConfig);
