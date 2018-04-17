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
}
