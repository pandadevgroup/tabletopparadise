/**
 * @module Tabletop
 */

import { DomHelper } from "./dom-helper";

/**
 * All classes that wish to be rendered onto the screen must
 * implement DomElement. For example, in a card game, the `Card`
 * class would implement `DomElement` so that it will be rendered
 * into the game area.
 *
 * There are two main methods to implement: `render` and `resize`.
 * - `render` is called once, and is where you create the element to
 *   be rendered. You attach any event listeners at this step. However,
 *   do not resize your element during this function. `resize` will be
 *   called right after `render`.
 * - `resize` is called every time the window is resized. This is where
 *   you update the element's position.
 *
 * If your element contains any sub-elements (eg. Player contains Card),
 * the element is responsible for managing its sub-elements. This means
 * that it needs to call `render()` and `resize()` on its sub-elements
 * when `render` and `resize` are called.
 *
 * When implementing this interface, start with this boilerplate:
 *
 * ```javascript
 * export class MyDomElement implements DomElement {
 *     protected $el: JQuery<HTMLElement>;
 *
 *     constructor(protected domHelper: DomHelper) {}
 *
 *     render() {
 *         this.$el = this.domHelper.createMyDomElementFrag();
 *     }
 *
 *     resize() {
 *         let pos = this.getPosition();
 *         this.domHelper.updateEl(this.$el, pos);
 *     }
 * }
 * ```
 *
 * If your element has sub-elements, use this boilerplate:
 *
 * ```javascript
 * export class MyDomElement implements DomElement {
 *     protected $el: JQuery<HTMLElement>;
 *     protected subElements: AnotherDomElement[] = [];
 *
 *     constructor(protected domHelper: DomHelper) {
 *         for (let i = 0; i < 5; i++) {
 *             this.subElements.push(new AnotherDomElement());
 *         }
 *     }
 *
 *     render() {
 *         this.$el = this.domHelper.createMyDomElementFrag();
 *         this.subElements.forEach(el => el.render());
 *     }
 *
 *     resize() {
 *         let pos = this.getPosition();
 *         this.domHelper.updateEl(this.$el, pos);
 *
 *         this.subElements.forEach(el => el.resize());
 *     }
 * }
 * ```
 */
export interface DomElement {
	/**
	 * Initialize your element here.
	 *
	 * Create the element through DomHelper and attach any event listeners.
	 *
	 * Do not resize/reposition the element in this function; `resize` will
	 * be called immediately after `render`.
	 *
	 * If your element has any sub-elements, call `render()` on the sub-elements
	 * in this function.
	 */
	render();
	/**
	 * Resize your element here. Called every time the window resizes.
	 *
	 * If your element has any sub-elements, call `resize()` on the sub-elements
	 * in this function.
	 */
	resize();
}
