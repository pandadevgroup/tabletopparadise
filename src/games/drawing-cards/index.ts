import { CardGame } from "../../card-game";

export class DrawingCardsGame extends CardGame {
	constructor(protected $canvas: JQuery<HTMLElement>) {
		super($canvas, {
			players: 1,
			initialHandSize: 13
		});
	}

	protected initialize(this: any) {
		let card = this.add.sprite(400, 300, 'jc').setInteractive();
		card.on('pointerdown', (pointer) => {
			this.tweens.add({
				targets: card,
				scaleY: 1.1,
				scaleX: 1.1,
				duration: 200
			});
		});
	}

	protected preload(this: any) {
		for (let i = 1; i <= 10; i++) {
			this.load.image(`${i}c`, `cards/clubs/${i}c.svg`);
			this.load.image(`${i}d`, `cards/diamonds/${i}d.svg`);
			this.load.image(`${i}h`, `cards/hearts/${i}h.svg`);
			this.load.image(`${i}s`, `cards/spades/${i}s.svg`);
		}
		this.load.image("jc", "cards/clubs/jc.svg");
		this.load.image("qc", "cards/clubs/qc.svg");
		this.load.image("kc", "cards/clubs/kc.svg");
		this.load.image("jd", "cards/diamonds/jd.svg");
		this.load.image("qd", "cards/diamonds/qd.svg");
		this.load.image("kd", "cards/diamonds/kd.svg");
		this.load.image("jh", "cards/hearts/jh.svg");
		this.load.image("qh", "cards/hearts/qh.svg");
		this.load.image("kh", "cards/hearts/kh.svg");
		this.load.image("js", "cards/spades/js.svg");
		this.load.image("qs", "cards/spades/qs.svg");
		this.load.image("ks", "cards/spades/ks.svg");
	}
}
