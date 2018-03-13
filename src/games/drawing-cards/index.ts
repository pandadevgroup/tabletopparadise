import { CardGame } from "../../card-game";

export class DrawingCardsGame extends CardGame {
	constructor(protected container: JQuery<HTMLElement>) {
		super(container, {
			players: 1,
			initialHandSize: 13,
			showDeck: true
		});
	}

	protected onDeckClick() {
		console.log("Deck click");
	}
}
