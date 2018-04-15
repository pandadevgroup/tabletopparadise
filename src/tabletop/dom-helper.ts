/**
 * @module Tabletop
 */

/**
 * DomHelper is a utility class that handles interaction with the DOM.
 *
 * It has three main jobs:
 * 1. **Provide a performant way to append a large number of elements
 *    to the DOM at once.** For example, in a card game, when the screen
 *    is first loaded, 52 cards are appended into the game object. To
 *    make this performant, DomHelper creates a document fragment and
 *    appends all the elements into the document fragment before
 *    then appending the document fragment into the DOM.
 * 2. **Update the position/rotation/style properties of DOM elements** (see the updateEl method)
 * 3. **Do not update any DOM properties when actions are being "played back".**
 *    If a user reconnects in the middle of the game, all the actions will
 *    be played back sequentially in order to get the user up-to-date with
 *    the current state of the game. During this time period, a large number
 *    of `updateEl()`s will be called in a short amount of time. We don't
 *    need to render all of these updates. Therefore, the DomHelper class
 *    provides a ready() function. Until the ready() function is called,
 *    no DOM changes will be made, with the exception of creating document fragments.
 *
 * You may extend this class to provide DOM manipulations that suit your game.
 */
export class DomHelper {
	/**
	 * A flag for whether or not to render DOM changes (updateEl, class changes, etc).
	 *
	 * Call `DomHelper.ready()` to set this to true.
	 *
	 * When a user rejoins a game, all the previous game actions need to be
	 * played back to update the user's state. During this time, a large
	 * number of unnecessary DOM manipulations will occur. We prevent this
	 * by using the `ready` flag.
	 */
	protected _ready = false;
	/**
	 * A performant, in-memory fragment used to render many elements
	 * onto the dom at once. New elements will be appended to this fragment,
	 * and when `renderFrag()` is called the entire fragment will be appended
	 * to the DOM in a high-performance manner.
	 */
	protected $frag = $(document.createDocumentFragment());

	constructor(
		/**
		 * The jQuery element representing the game container.
		 * Typically `$("#game")`, where `#game` is a `<div>`.
		 */
		protected $container: JQuery<HTMLElement>
	) {}

	/**
	 * Updates the given element with the given properties.
	 *
	 * You may override this function to provide more features that suit
	 * your game. If you do so, do *not* call `super()`. Make sure
	 * to check the `_ready` flag:
	 *
	 * ```javascript
	 * updateEl($el, options) {
	 *     if (!this._ready) return;
	 *     // Code goes here
	 * }
	 * ```
	 */
	updateEl($el: JQuery<HTMLElement>, options: {
		x: number,
		y: number,
		zIndex?: number,
		rotateX?: number,
		rotateY?: number,
		rotateZ?: number
	}) {
		if (!this._ready) return;
		let { x, y, zIndex, rotateX, rotateY, rotateZ } = options;
		$el.prop("style", `transform: translate(${x}px, ${y}px) ` +
				(rotateX ? `rotateX(${rotateX}deg) ` : "") +
				(rotateY ? `rotateY(${rotateY}deg) ` : "") +
				(rotateZ ? `rotateZ(${rotateZ}deg) ` : "") +
				`; ` +
				(zIndex ? `z-index: ${zIndex};` : "")
		);
	}

	/**
	 * Helper function that adds a given class to the supplied element.
	 *
	 * Will do nothing if `ready()` has not been called.
	 *
	 * @param $el The target element
	 * @param className The class name to add
	 */
	addClass($el: JQuery<HTMLElement>, className: string) {
		if (!this._ready) return;
		$el.addClass(className);
	}

	/**
	 * Helper function that removes a given class to the supplied element.
	 *
	 * Will do nothing if `ready()` has not been called.
	 *
	 * @param $el The target element
	 * @param className The class name to remove
	 */
	removeClass($el: JQuery<HTMLElement>, className: string) {
		if (!this._ready) return;
		$el.removeClass(className);
	}

	/**
	 * Appends `$frag` to `$container`. Call this after you have finished
	 * adding all game objects to `$frag` and are ready to render them
	 * onto the screen.
	 */
	renderFrag() {
		this.$container.append(this.$frag);
	}

	/**
	 * Sets the `ready` flag. While the `ready`	flag is false,
	 * none of the helper dom manipulation functions will do
	 * anything (updateEl, addClass, removeClass, etc).
	 *
	 * @param ready value to set the ready flag to.
	 */
	ready(ready = true) {
		this._ready = ready;
	}
}
