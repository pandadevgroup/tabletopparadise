import { DomHelper } from "../tabletop/dom-helper";

export class CardGameDomHelper extends DomHelper {
	createCardFrag(cardImgUrl: string) {
		let $card = $(`
			<div class="card">
				<img class="card__img" src="/assets/cards/${cardImgUrl}.svg">
			</div>
		`);

		this.$frag.append($card);

		return $card;
	}
}
