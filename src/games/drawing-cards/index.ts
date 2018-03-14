import { CardGame } from "../../card-game";

export class DrawingCardsGame extends CardGame {
	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 1,
			initialHandSize: 13,
			showDeck: true,
			shuffle:function(array) {
				return array;
			}//dosent work.
		});
	}

	protected onDeckClick() {
		
		this.players[0].addCard(this.deck.get(1)[0]);
		if (this.deck.cards.length === 0) this.deck.actionable = false;
	}

	protected startGame() {
		
		this.deck.actionable = true;
	}
}
