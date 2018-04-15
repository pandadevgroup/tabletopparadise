export class DomHelper {
	_ready = false;
	$frag = $(document.createDocumentFragment());

	constructor(protected $container: JQuery<HTMLElement>) {}

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

	addClass($el: JQuery<HTMLElement>, className: string) {
		if (!this._ready) return;
		$el.addClass(className);
	}

	removeClass($el: JQuery<HTMLElement>, className: string) {
		if (!this._ready) return;
		$el.removeClass(className);
	}

	renderFrag() {
		this.$container.append(this.$frag);
	}

	ready() {
		this._ready = true;
	}
}
