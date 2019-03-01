/**
 * @module BridgeGame
 */

import { BridgeDomHelper } from "./dom-helper";

import "./styles/bidding-modal.scss";
import { DomElement } from "../../tabletop";

export class BiddingModal implements DomElement {
	protected $biddingModal: JQuery<HTMLElement>;
	protected oldVisibility = true;
	protected visible = true;

	constructor(
		protected domHelper: BridgeDomHelper,
	) {}

	render() {
		this.$biddingModal = this.domHelper.createBiddingModal();
	}

	resize() {
		if (this.visible == this.oldVisibility) return;
		this.domHelper.updateModalVisibility(this.$biddingModal, this.visible);
		this.oldVisibility = this.visible;
	}

	showModal() {
		this.visible = true;
	}

	hideModal() {
		this.visible = false;
	}
}
