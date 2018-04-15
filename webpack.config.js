const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "docs")
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
		new CopyWebpackPlugin([
			{ from: "src/assets", to: "assets" },
			{ from: "src/index.html", to: "." },
			{ from: "src/game.html", to: "./game/index.html" },
			{ from: "src/lobby.html", to: "./lobby/index.html" },
			{ from: "CNAME", to: "." }
		])
	],
	devServer: {
		port: 3000
	},
	mode: "development"
};
