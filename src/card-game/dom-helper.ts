import { DomHelper } from "../tabletop/dom-helper";

export class CardGameDomHelper extends DomHelper {
	createCardFrag(cardImgUrl: string) {
		let $card = $(`
			<div class="card">
				<img class="card__front" src="/assets/cards/${cardImgUrl}.svg">
				<img class="card__back" src="/assets/cards/card_back.png">
			</div>
		`);

		this.$frag.append($card);

		return $card;
	}
}
