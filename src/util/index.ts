export default class Utils {
	static random(from: number, to: number) {
		return Math.floor(Math.random() * (to - from)) + from;
	}

	static renderDeck($el: JQuery<HTMLElement>): JQuery<HTMLElement> {
		return $el.append(`<div class="deck"></div>`);
	}
}
