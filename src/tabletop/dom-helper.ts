export class DomHelper {
	$frag = $(document.createDocumentFragment());

	constructor(protected $container: JQuery<HTMLElement>) {}

	resizeEl($el: JQuery<HTMLElement>, options: any) {
		const defaultOpts = {
			translateZ: 0, // Force hardware acceleration
			duration: 200,
		};
		$el.velocity({
			...defaultOpts,
			...options,
		});
	}

	setElStyles($el: JQuery<HTMLElement>, styles: any) {
		$el.css(styles);
	}

	renderFrag() {
		this.$container.append(this.$frag);
	}
}
