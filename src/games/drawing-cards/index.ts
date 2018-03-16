import { CardGame, CardGamePlayer, Card } from "../../card-game";
import { Deck } from "../../card-game";
import { Mutiplayer } from "../../server/mutiplayer";
import { Event } from "../../server/event";
import { Action } from "../../server/action";


export class DrawingCardsGame extends CardGame {
	mp:Mutiplayer;
	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 4,
			initialHandSize: 5,
			showDeck: true
		});
		this.mp = new Mutiplayer("test");
		this.mp.on("card_dealt", function(event:Event) {
			alert("card_dealt");
		});
	}

	onDeckClick() {
		let card = this.drawCard();
		card.setActionable(true);
		this.mp.push(new Action("card_dealt", {
			parent:"deck",//this.deck
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
