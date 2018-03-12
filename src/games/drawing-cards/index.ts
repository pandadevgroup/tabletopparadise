import { CardGame } from "../../card-game";

const resources = PIXI.loader.resources,
	loader = PIXI.loader,
	Sprite = PIXI.Sprite;

export class DrawingCardsGame extends CardGame {
	constructor(protected $canvas: JQuery<HTMLCanvasElement>) {
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

	protected loadResources() {
		for (let i = 1; i <= 10; i++) {
			loader.add(`${i}c`, `/assets/cards/clubs/${i}c.svg`);
			loader.add(`${i}d`, `/assets/cards/diamonds/${i}d.svg`);
			loader.add(`${i}h`, `/assets/cards/hearts/${i}h.svg`);
			loader.add(`${i}s`, `/assets/cards/spades/${i}s.svg`);
		}
		loader.add("jc", "/assets/cards/clubs/jc.svg");
		loader.add("qc", "/assets/cards/clubs/qc.svg");
		loader.add("kc", "/assets/cards/clubs/kc.svg");
		loader.add("jd", "/assets/cards/diamonds/jd.svg");
		loader.add("qd", "/assets/cards/diamonds/qd.svg");
		loader.add("kd", "/assets/cards/diamonds/kd.svg");
		loader.add("jh", "/assets/cards/hearts/jh.svg");
		loader.add("qh", "/assets/cards/hearts/qh.svg");
		loader.add("kh", "/assets/cards/hearts/kh.svg");
		loader.add("js", "/assets/cards/spades/js.svg");
		loader.add("qs", "/assets/cards/spades/qs.svg");
		loader.add("ks", "/assets/cards/spades/ks.svg");
	}

	protected setup() {
		let card = new Sprite(resources["1c"].texture);

		this.app.stage.addChild(card);
	}
}
