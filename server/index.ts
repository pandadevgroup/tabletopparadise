const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");

let gameActions = [];
let gamePlayers = {
	"player1": {
		username: "Player #1",
		isHost: true
	},
	"player2": {
		username: "Player #2",
		isHost: false
	},
	"player3": {
		username: "Player #3",
		isHost: false
	},
	"player4": {
		username: "Player #4",
		isHost: false
	}
};

app.use(cors());
app.get("/players", (req, res) => {
	res.send(gamePlayers);
});
app.get("/actions", (req, res) => {
	res.send(gameActions);
});

io.on("connection", function(socket) {
	console.log("a user connected");

	socket.on("new_action", action => {
		gameActions.push(action);
		socket.broadcast.emit("new_action", action);
	});

	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
});

http.listen(3001, function(){
	console.log("listening on *:3001");
});
