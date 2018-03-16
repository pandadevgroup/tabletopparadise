export class DomHelper {
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
		let { x, y, zIndex, rotateX, rotateY, rotateZ } = options;
		requestAnimationFrame(() => {
			$el.prop("style", `transform: translate(${x}px, ${y}px) ` +
					(rotateX ? `rotateX(${rotateX}deg) ` : "") +
					(rotateY ? `rotateY(${rotateY}deg) ` : "") +
					(rotateZ ? `rotateZ(${rotateZ}deg) ` : "") +
					`; ` +
					(zIndex ? `z-index: ${zIndex};` : "")
			);
		});
	}

	renderFrag() {
		this.$container.append(this.$frag);
	}
}
