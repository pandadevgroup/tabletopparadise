import { DomHelper } from "../tabletop/dom-helper";

export class CardGameDomHelper extends DomHelper {
	createDeckFrag() {
		let $deck = $(`
			<div class="deck"></div>
		`);

		this.$frag.append($deck);

		return $deck;
	}

	showPlayButton($btn: JQuery<HTMLElement>) {
		if (!this._ready) return;
		$btn.addClass("play-button--show");
	}

	hidePlayButton($btn: JQuery<HTMLElement>) {
		if (!this._ready) return;
		$btn.removeClass("play-button--show");
	}
	showWaitingMsg() {
		if (!this._ready) return;
		$("#waiting-message").addClass("waiting-message--show");
	}

	hideWaitingMsg() {
		if (!this._ready) return;
		$("#waiting-message").removeClass("waiting-message--show");
		
	}
	/* todo: add styling, test to make sure this actually works
	addCallout($inner: JQuery<HTMLElement>) {
		if (!this._ready) return;
		let calloutHTML = `
		<div class="callout">

		</div>
		`
		$("#callouts").prepend($(calloutHTML).prepend($inner));
		return $(calloutHTML);
	}

	removeCallout($callout: JQuery<HTMLElement>) {
		if (!this._ready) return;
		$callout.remove();
	}
	*/
	createPlayButtonFrag() {
		let $btn = $(`
			<button class="play-button btn btn-dark btn-lg">Play!</button>
		`);

		this.$frag.append($btn);

		return $btn;
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

	createCardFrag(cardImgUrl: string, visible: boolean) {
		let $card = $(`
			<div class="card ${visible ? "card--visible" : ""}">
				<img class="card__front" src="/assets/cards/${cardImgUrl}.svg">
				<img class="card__back" src="/assets/cards/card_back.png">
			</div>
		`);

		this.$frag.append($card);

		return $card;
	}
}
