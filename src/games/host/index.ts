import { CardGame, CardGamePlayer, Card } from "../../card-game";
import { Deck } from "../../card-game";
import { ServerConnection, Action } from "../../server";

export class HostGame extends CardGame {
	server: ServerConnection;
	uid: string;
	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 2,
			initialHandSize: 13,
			showDeck: true
		});
		this.uid = localStorage.getItem("uid");
		//TODO: use firebase
		if (this.uid == "host") {//first host
			$("#host-btn").text("Host");
		}
		this.server = new ServerConnection("test");
		this.server.on("card_dealt", (action: Action) => {
			console.log(action);
			console.log("Drew card");
		});
		this.server.on("host_switch", (action: Action) => {
			console.log(action);
			console.log("Host Switched");
			$("#host-btn").text("Switch to host");
			$("#host-btn").click(function () {
				console.log(1);
				parent.server.dispatch(new Action("host_switch", {
					parent: parent.uid
				}));
				$("#host-btn").text("Host");

			});
		});
		let parent = this;
		console.log($("#host-btn"));
		if (this.uid !== "host") {
			$("#host-btn").click(function () {
				console.log(1);
				parent.server.dispatch(new Action("host_switch", {
					parent: parent.uid
				}));
				$("#host-btn").text("Host");
				$("body").off("#host-btn", "click");
			});
		}

		


	}

	onDeckClick() {
		let card = this.drawCard();
		card.setActionable(true);
		this.server.dispatch(new Action("card_dealt", {
			parent: "deck",
			target: this.uid
		}));
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton = true;
		else this.showPlayButton = false;
	}

	onPlayBtnClick() {
		//this.playSelectedCards();
	}

	startGame() {
		this.deck.setAcitonable(true);
		this.players[0].cards.forEach(card => card.setActionable(true));



		$("#loading").addClass("hidden");
		$("#game").removeClass("hidden");



	}
}
