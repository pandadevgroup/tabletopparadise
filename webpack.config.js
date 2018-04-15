const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		game: "./src/game.ts",
		lobby: "./src/lobby/index.ts"
	},
	output: {
		filename: "[name].js",
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
			{ from: "src/lobby/**/*.html", to: "lobby", flatten: true },
			{ from: "public", to: "." },
			{ from: "src/game.html", to: "./game/index.html" },
		])
	],
	devServer: {
		port: 3000
	},
	mode: "development"
};
