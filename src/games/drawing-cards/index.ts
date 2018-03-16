import { CardGame, CardGamePlayer, Card } from "../../card-game";
import { Deck } from "../../card-game";
import { ServerConnection, Action } from "../../server";

export class DrawingCardsGame extends CardGame {
	server: ServerConnection;

	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 4,
			initialHandSize: 5,
			showDeck: true
		});

		this.server = new ServerConnection("test");
		this.server.on("card_dealt", (action: Action) => {
			console.log(action);
			console.log("Drew card");
		});
	}

	onDeckClick() {
		let card = this.drawCard();
		card.setActionable(true);
		this.server.push(new Action("card_dealt", {
			parent:"deck",
			target:"Jeffrey"
		}));
	}

	onSelectedCardsChange(selectedCards: Card[]) {
		if (selectedCards.length !== 0) this.showPlayButton = true;
		else this.showPlayButton = false;
	}

	onPlayBtnClick() {
		this.playSelectedCards();
	}

	startGame() {
		this.deck.setAcitonable(true);
		this.players[0].cards.forEach(card => card.setActionable(true));
	}
}
