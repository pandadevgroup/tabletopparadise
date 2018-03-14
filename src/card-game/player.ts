import { Player } from "../tabletop";
import { Card } from "./card";

export class CardGamePlayer extends Player {
	protected cards: Card[] = [];

	generatePlayerCode() {
		return this.getCardsCode(this.cards);
	}

	addCards(cards: Card[]) {
		this.cards = [...this.cards, ...cards];
		let $cards = $(this.getCardsCode(cards));
		this.$player.append($cards);
		
	}
	addCard(card: Card) {
		let renderCode = card.getRenderCode();
		//console.log(1)
		let player = this.$player;
		//console.log($("#" + this.cards[this.cards.length - 2].getID()).offset().top);
		//console.log($("#" + this.cards[this.cards.length - 2].getID()).offset().left);
		let $lastCard = $("#" + this.cards[this.cards.length - 1].getID() + "_img");
		let $currentCard = $("#" + card.getID());
		let parent = this;
		$currentCard.animate({
			left:$lastCard.offset().left - $currentCard.offset().left,
            top:$lastCard.offset().top - $currentCard.offset().top,
			
		  },400,function(){
			  parent.cards.push(card);
			$(player).append(renderCode);
			console.log(2)
		});
		
	}
	
	getCardsCode(cards: Card[]): string {
		let cardsCode = [];
		cards.forEach(card => {
			cardsCode.push(card.getRenderCode());
		});
		return cardsCode.join("");
	}
}
