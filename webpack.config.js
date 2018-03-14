const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		extensions: [".ts", ".js", ".tsx"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: "file-loader"
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([{ from: "src/assets", to: "assets"}])
	],
	devServer: {
		port: 3000
	},
	mode: "development"
};
