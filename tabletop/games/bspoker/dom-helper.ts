/**
 * @module Games
 */
import { CardGameDomHelper } from "../../card-game";

export class BSPokerDomHelper extends CardGameDomHelper {
	createBridgePlayerFrag(name: string) {
		let $player = $(`
			<div class="player">
				<span class="player__name">${name}</span>
				<span class="bspoker-player__latestBid">Latest Bid: Flush of Hearts}</span>
			</div>
		`);

		this.$frag.append($player);

		return $player;
	}

	updateBridgePlayer($el) {
		if (!this._ready) return;

		$el.find(".bridge-bspoker-player__latestBid").text(`Latest Bid: Flush of Hearts`);
	}
}
