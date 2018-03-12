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

	protected loadResources() {}

	protected setup() {

	}
}
