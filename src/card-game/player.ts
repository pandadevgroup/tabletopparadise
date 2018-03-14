import { Player } from "../tabletop";
import { Card } from "./card";

export class CardGamePlayer extends Player {
	cards: Card[];

	generatePlayerCode() {
		let cardsCode = [];
		this.cards.forEach(card => {
			cardsCode.push(`
				<div class="card">
					<img class="card__img" src="/assets/cards/${card.getImgName()}.svg">
				</div>
			`);
		});
		return cardsCode.join("");
	}
}
