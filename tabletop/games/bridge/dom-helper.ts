/**
 * @module Games
 */
import { CardGameDomHelper } from "../../card-game";

export class BridgeDomHelper extends CardGameDomHelper {
	createBridgePlayerFrag(name: string, tricks: number, isTurn: boolean) {
		let $player = $(`
			<div class="player bridge-player ${isTurn ? 'bridge-player--active' : ''}">
				<span class="player__name">${name}</span>
				<span class="bridge-player__tricks">Tricks: ${tricks}</span>
			</div>
		`);

		this.$frag.append($player);

		return $player;
	}

	updateBridgePlayer($el, tricks) {
		if (!this._ready) return;

		$el.find(".bridge-player__tricks").text(`Tricks: ${tricks}`);
	}
}
