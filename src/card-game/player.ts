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
<<<<<<< HEAD
		
=======
		$cards.velocity({
			translateY: "-50px"
		}, { duration: 0 });
		$cards.velocity({
			translateY: "0px"
		});
>>>>>>> parent of 0689e8b... remove render code
	}
	addCard(card: Card) {
		let renderCode = card.getRenderCode();
		console.log(1)
		var player = this.$player;
		$("#" + card.getID()).animate({
			left:$(player).offset().left,
            top:$(player).offset().top,
			
		  },200,function(){
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
