/**
 * @module CardGame
 */

import { Player } from "../base-game";
import { Card } from "./card";
import { CardUtils } from "./utils";
import { Tabletop } from "../tabletop";
import { CardGameDomHelper } from "./dom-helper";
import { CardGame } from "./card-game";
import "./styles/player.scss"

export class CardGamePlayer extends Player {
	cards: Card[] = [];
	selectedCards: Card[] = [];

	constructor(
		public id: string,
		public name: string,
		public isHost: boolean,
		public isLocal: boolean,
		public position: any,
		protected hideCards: boolean,
		protected sortMethod: any,
		protected domHelper: CardGameDomHelper,
		protected tabletop: Tabletop,
		protected game: CardGame
	) {
		super(id, name, isHost, isLocal, position, domHelper, game);
	}

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
		if (this.isLocal) this.sortCards();

		this.cards.forEach((card, i) => {
			card.index = i;
			card.setVisible(true);
			card.onClick = this.onCardClick.bind(this);
		});
	}

	sortCards() {
		CardUtils.sortCards(this.cards, this.sortMethod);
	}

	getCardIDs() {
		return this.cards.map(card => card.id);
	}

	getSelectedCardIDs() {
		return this.selectedCards.map(card => card.id);
	}

	getCardsFromIDs(cardIds: string[]) {
		const set = new Set(cardIds);
		return this.cards.filter(card => set.has(card.id));
	}

	removeCards(cards: Card[]) {
		const cardIds = new Set(cards.map(card => card.index));
		this.cards = this.cards.filter(card => !cardIds.has(card.index));

		this.cards.forEach((card, i) => {
			card.index = i;
		});
	}

	setCards(cards: Card[]) {
		this.cards = [];
		this.addCards(cards);
	}

	onCardClick(card: Card) {
		card.resize(this.getCardPosition(card));

		if (card.selected) this.selectedCards.push(card);
		else this.selectedCards.splice(this.selectedCards.indexOf(card), 1);

		if (this.isLocal) this.game.onSelectedCardsChange(this.selectedCards);
	}

	render() {
		this.player$ = this.domHelper.createPlayerFrag(this.name);
		this.cards.forEach(card => card.render());
	}

	resize() {
		let playerPos = this.getPlayerPosition();
		this.domHelper.updateEl(this.player$, playerPos);
		this.cards.forEach(card => card.resize(this.getCardPosition(card)));
	}

	protected getCardPosition(card: Card) {
		const index = card.index;
		const tbl = this.tabletop;
		const opts = this.domHelper.layoutOpts;
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

	protected getPlayerPosition() {
		const opts = this.domHelper.layoutOpts;
		const tbl = this.tabletop;
		const cardSize = opts.cardHeight + opts.playerPadding;

		switch (this.position) {
			case "left": {
				return {
					x: cardSize + opts.playerPadding,
					y: Math.round(tbl.height / 2 + opts.playerHeight / 2)
				};
			}
			case "right": {
				return {
					x: tbl.width - cardSize - opts.playerPadding - opts.playerWidth,
					y: Math.round(tbl.height / 2 + opts.playerHeight / 2)
				};
			}
			case "top": {
				return {
					x: Math.round(tbl.width / 2 - opts.playerWidth / 2),
					y: cardSize + opts.playerPadding
				};
			}
			case "bottom": {
				return {
					x: Math.round(tbl.width / 2 - opts.playerWidth / 2),
					y: tbl.height - opts.playerHeight - cardSize - opts.playerPadding
				};
			}
		}
		throw "Position unknown";
	}
}
