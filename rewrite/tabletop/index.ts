
/**
 * Tabletop controls the layout of the game.
 *
 * By default, it only provides the width and height of the game area.
 * However, you will extend this class for your own custom games to:
 * 1. Add layout options that depend on game size (eg. dynamically-sized playing cards)
 * 2. Add methods to calculate location of game objects (eg. a function that calculates the location of a player's playing hand)
 *
 * Example extension of Tabletop:
 * ```javascript
 * export class CustomTabletop extends Tabletop {
 *     layoutOpts = {
 *         cardHeight: 120
 *     };
 *     cards = [];
 *
 *     constructor(
 *         protected $container: JQuery<HTMLElement>,
 *         protected domHelper: DomHelper
 *     ) {
 *         super($container);
 *     }
 *
 *     playCard(card) {
 *         let cardPos = this.getCardPosition(card);
 *         card.setPosition(cardPos);
 *
 *         this.cards.push(card);
 *     }
 *
 *     getCardPosition(card) {
 *         // TODO: generate card position
 *         return 0;
 *     }
 *
 *     resize() {
 *         super();
 *
 *         if (this.height <= 1000) {
 *             this.layoutOpts.cardHeight = 100;
 *         } else {
 *             this.layoutOpts.cardHeight = 120;
 *         }
 *     }
 * }
 * ```
 */
export class Tabletop {
	/**
	 * The width (in px) of the play area.
	 *
	 * Recalculated in resize()
	 */
	public width = 1080;

	/**
	 * The height (in px) of the play area.
	 *
	 * Recalculated in resize()
	 */
	public height = 720;

	constructor(
		protected $container: JQuery<HTMLElement>
	) {}

	/**
	 * Updates width and height properties. Called on `$(window).resize()`.
	 *
	 * Extend this method to update any layout options that depend on game size
	 * (eg. dynamically sized playing cards)
	 */
	resize() {
		this.width = this.$container.width();
		this.height = this.$container.height();
	}
}
