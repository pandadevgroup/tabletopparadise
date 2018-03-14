import { Player } from "../tabletop";
import { Card } from "./card";

export class CardGamePlayer extends Player {
	cards: Card[];

	generatePlayerCode() {
		let cardsCode = [];
		this.cards.forEach(card => {
			cardsCode.push(`
				<div class="card">
					${ card.toString() }
				</div>
			`);
		});
		return cardsCode.join("");
	}
}
