import "../styles/index.scss";
import Utils from "../util";
import { DomHelper } from "./dom-helper";

export abstract class TabletopOptions {
	/**
	 * Number of players (1 - 12)
	*/
	abstract players: number;
}

export class Tabletop {
	layout: {
		width: number,
		height: number
	} = {
		width: 1080,
		height: 720
	};

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected opts: TabletopOptions,
		protected domHelper: DomHelper
	) {}

	resize() {
		this.layout = {
			width: this.$container.width(),
			height: this.$container.height()
		};
	}
}
