
/**
 * Tabletop is a layout helper that provides the width and height of the play area.
 *
 * You may extend this class for your own custom games to:
 * 1. Add layout options that depend on game size (eg. dynamically-sized playing cards)
 * 2. Add methods to calculate location of game objects (eg. a function that calculates the location of a player's playing hand)
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
		/**
		 * The jQuery container where the game will be rendered.
		 *
		 * @access protected
		 * @type {JQuery<HTMLElement>}
		 */
		protected $container: JQuery<HTMLElement>
	) {}

	/**
	 * Updates width and height properties. Called on `$(window).resize()`.
	 *
	 * Extend this method to update any layout options that depend on game size
	 * (eg. dynamically sized playing cards)
	 *
	 * Always remember to call `super()`!
	 */
	resize() {
		this.width = this.$container.width();
		this.height = this.$container.height();
	}
}
