/**
 * @module Games
 */
import { CardGamePlayer } from "../../card-game";
import { BridgeDomHelper } from "./dom-helper";

export class BridgePlayer extends CardGamePlayer {
	public tricks = 0;
	public partner: BridgePlayer = null;
	protected domHelper: BridgeDomHelper;

	render() {
		this.player$ = this.domHelper.createBridgePlayerFrag(this.name, this.tricks);
		this.cards.forEach(card => card.render());
	}

	resize() {
		this.domHelper.updateBridgePlayer(this.player$, this.tricks);
		let playerPos = this.getPlayerPosition();
		this.domHelper.updateEl(this.player$, playerPos);
		this.cards.forEach(card => card.resize(this.getCardPosition(card)));
	}
}
