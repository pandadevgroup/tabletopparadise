/**
 * @module CardGame
 */
import { DomElement } from "../tabletop";
import { CardGameDomHelper } from "./dom-helper";

export class Card implements DomElement {
	constructor(
		private domHelper: CardGameDomHelper,
		public number: number,
		public suit: "club" | "diamond" | "heart" | "spade",
		public index: number,
		public visible: boolean = true,
		public id: string
	) {}

	render() {}
	resize() {}
}
