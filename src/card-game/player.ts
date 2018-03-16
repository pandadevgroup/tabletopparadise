import { Card } from "./card";
import { CardGameDomHelper } from "./dom-helper";
import { CardGame } from ".";
import { CardUtils } from "./utils";

export class CardGamePlayer {
	cards: Card[] = [];
	selectedCards: Card[] = [];

	constructor(
		protected domHelper: CardGameDomHelper,
		protected game: CardGame,
		protected name: string,
		protected position: "top" | "left" | "right" | "bottom",
		protected hideCards: boolean,
		/**
		 * If true, this player is playing on the computer right now.
		 *
		 * If false, this player is playing remotely.
		 */
		public isLocal: boolean
	) {}

	resize() {
		this.cards.forEach(card => card.resize());
	}

	getCardPosition(index) {
		const tbl = this.game.tabletop;
		const opts = this.game.layoutOpts;
		const selected = this.cards[index].selected;

		let left = Math.round(tbl.width / 2 - opts.cardWidth / 2 - (opts.cardSpacing * (this.cards.length - 1)) / 2);
		let top = Math.round(tbl.height / 2 - opts.cardWidth / 2 - (opts.cardSpacing * (this.cards.length - 1)) / 2);

		if (this.position === "bottom") {
			return {
				x: left + opts.cardSpacing * index,
				y: tbl.height - opts.cardHeight - opts.playerPadding - (selected ? opts.cardShift : 0),
				rotateX: this.hideCards ? 180 : 0,
				zIndex: index
			};
		} else if (this.position === "left") {
			return {
				x: Math.round(opts.playerPadding + (opts.cardHeight - opts.cardWidth) / 2) + (selected ? opts.cardShift : 0),
				y: top + opts.cardSpacing * index,
				rotateX: this.hideCards ? 180 : 0,
				rotateZ: 90,
				zIndex: index
			};
		} else if (this.position === "right") {
			return {
				x: Math.round(tbl.width - opts.playerPadding - opts.cardWidth - (opts.cardHeight - opts.cardWidth) / 2) - (selected ? opts.cardShift : 0),
				y: top + opts.cardSpacing * index,
				rotateX: this.hideCards ? 180 : 0,
				rotateZ: 90,
				zIndex: index
			};
		} else if (this.position === "top") {
			return {
				x: left + opts.cardSpacing * index,
				y: opts.playerPadding + (selected ? opts.cardShift : 0),
				rotateX: this.hideCards ? 180 : 0,
				zIndex: index
			};
		}
	}

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
		CardUtils.sortCards(this.cards);

		this.cards.forEach((card, i) => {
			card.index = i;
			card.setParent(this);
			card.setVisible(true);
		});
	}

	removeCards(cards: Card[]) {
		const cardIds = new Set(cards.map(card => card.index));
		this.cards = this.cards.filter(card => !cardIds.has(card.index));

		this.cards.forEach((card, i) => {
			console.log(i);
			card.index = i;
		});
	}

	clearSelectedCards() {
		this.selectedCards = [];
	}

	handleCardClick(index: number) {
		let card = this.cards[index];
		card.resize();

		if (card.selected) this.selectedCards.push(card);
		else this.selectedCards.splice(this.selectedCards.indexOf(card), 1);

		this.game.onCardClick(this, index, this.selectedCards);
	}
}
