/**
 * @module Games
 */
import { CardGamePlayer } from "../../card-game";
import { BSPokerDomHelper } from "./dom-helper";
export class BSPokerPlayer extends CardGamePlayer {
	public points = 5;
	protected domHelper: BSPokerDomHelper;

	render() {
		this.player$ = this.domHelper.createBridgePlayerFrag(this.name);
		this.cards.forEach(card => card.render());
	}

	resize() {
		this.domHelper.updateBridgePlayer(this.player$);
		let playerPos = this.getPlayerPosition();
		this.domHelper.updateEl(this.player$, playerPos);
		this.cards.forEach(card => card.resize(this.getCardPosition(card)));
	}
}
