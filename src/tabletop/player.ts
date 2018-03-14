import { Tabletop } from ".";
import { DomHelper } from "./dom-helper";

export class Player {
	constructor(
		protected domHelper: DomHelper,
		protected parent: Tabletop,
		protected name?: string
	) {}

	resize() {};
}
