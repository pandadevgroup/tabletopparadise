/**
 * @module Games
 */
import { CardGameDomHelper } from "../../card-game";

export class BridgeDomHelper extends CardGameDomHelper {
	constructor(
		protected $container: JQuery<HTMLElement>
	) {
		super($container);
	}

	createBiddingModal() {
		const $biddingModal = $(`
			<div class="bridge-bidding-modal">
				<h3>Bidding</h3>
				<div class="bridge-bidding-modal__value">
					<div class="btn-group">
						<button type="button" class="btn btn-secondary">1</button>
						<button type="button" class="btn btn-secondary">2</button>
						<button type="button" class="btn btn-secondary">3</button>
						<button type="button" class="btn btn-secondary">4</button>
						<button type="button" class="btn btn-secondary">5</button>
						<button type="button" class="btn btn-secondary">6</button>
						<button type="button" class="btn btn-secondary">7</button>
					</div>
				</div>
				<div class="bridge-bidding-modal__suit">
					<div class="btn-group">
						<button type="button" class="btn btn-secondary">Club</button>
						<button type="button" class="btn btn-secondary">Diamond</button>
						<button type="button" class="btn btn-secondary">Heart</button>
						<button type="button" class="btn btn-secondary">Spade</button>
					</div>
				</div>
				<div class="bridge-bidding-modal__past-bids">
					<h4>Past Bids</h4>
					<p>Player #1: 1 Heart</p>
					<p>Player #2: 1 Heart</p>
					<p>Player #3: 1 Heart</p>
				</div>
				<button type="button" class="btn btn-outline-primary btn-lg">Confirm</button>
			</div>
		`);

		this.$frag.append($biddingModal);

		return $biddingModal;
	}

	updateModalVisibility(modal: JQuery<HTMLElement>, visible: boolean) {
		if (!this._ready) return;

		if (visible) modal.show();
		else modal.hide();
	}

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
