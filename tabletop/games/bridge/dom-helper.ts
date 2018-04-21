/**
 * @module Games
 */
import { CardGameDomHelper } from "../../card-game";

export class BridgeDomHelper extends CardGameDomHelper {
	createBridgePlayerFrag(name: string, tricks: number) {
		let $player = $(`
			<div class="player">
				<span class="player__name">${name}</span>
				<span class="bridge-player__tricks">Tricks: ${tricks}</span>
			</div>
		`);

		this.$frag.append($player);

		return $player;
	}
}
