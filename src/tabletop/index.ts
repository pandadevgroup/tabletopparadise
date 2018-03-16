import "../styles/index.scss";
import Utils from "../util";
import { DomHelper } from "./dom-helper";

export abstract class TabletopOptions {
	/**
	 * Number of players (1 - 4)
	*/
	abstract players: number;
}

export class Tabletop {
	width = 1080;
	height = 720;

	constructor(
		protected $container: JQuery<HTMLElement>,
		public opts: TabletopOptions,
		protected domHelper: DomHelper
	) {}

	resize() {
		this.width = this.$container.width();
		this.height = this.$container.height();
	}
}
