import { CardGame } from "../../card-game";

export class DrawingCardsGame extends CardGame {
	constructor(protected canvas: JQuery<HTMLElement>) {
		super(canvas, {
			players: 1,
			initialHandSize: 13
		});
	}

	protected initialize() {
		this.players.forEach(player => this.canvas.append(
			`
				<p>${ player.name }</p>
				<p>${ player.cards.join(", ") }</p>
			`
		));
	}
}
