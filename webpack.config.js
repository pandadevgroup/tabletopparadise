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
				exclude: /node_modules|old/
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				],
				exclude: /old/
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: "file-loader",
				exclude: /old/
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
