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
		$btn.addClass("play-button--show");
	}

	hidePlayButton($btn: JQuery<HTMLElement>) {
		$btn.removeClass("play-button--show");
	}

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
