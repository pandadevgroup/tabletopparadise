import { CardGame } from "../../card-game";

const resources = PIXI.loader.resources,
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
		PIXI.loader
			.add("jc", "/assets/cards/clubs/jc.svg")
			.load(() => this.setup());
	}

	protected setup() {
		let sprite = new Sprite(resources.jc.texture);
		this.app.stage.addChild(sprite);
	}
}
