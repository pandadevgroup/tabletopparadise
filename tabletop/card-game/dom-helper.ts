/**
 * @module CardGame
 */

import { DomHelper } from "../tabletop";

export class CardGameDomHelper extends DomHelper {
	createDeckFrag() {
		let $deck = $(`
			<div class="deck"></div>
		`);

		this.$frag.append($deck);

		return $deck;
	}

	createCardFrag(cardImgUrl: string, visible: boolean) {
		let $card = $(`
			<div class="card${visible ? " card--visible" : ""}">
				<img class="card__front" src="/assets/cards/${cardImgUrl}.svg">
				<img class="card__back" src="/assets/cards/card_back.png">
			</div>
		`);

		this.$frag.append($card);

		return $card;
	}

	createPlayerFrag(name: string) {
		let $player = $(`
			<div class="player">
				<span class="player__name">${name}</span>
			</div>
		`);

		this.$frag.append($player);

		return $player;
	}
}
