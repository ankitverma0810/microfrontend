const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

// setting env variable in container.yml file in the workflows
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
	mode: "production",
	output: {
		filename: "[name].[contenthash].js",
		/* Used by HtmlWebpackPlugin to prepend it in the script name before injecting it into the html document */
		/* path should be same where we are placing our container files in the S3 bucket */
		/* please refer container.yml file. aws s3 sync dist s3://${{ secrets.AWS_S3_BUCKET_NAME }}/container/latest */
		publicPath: "/container/latest/",
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container",
			remotes: {
				marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
				auth: `auth@${domain}/auth/latest/remoteEntry.js`,
			},
			shared: packageJson.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
