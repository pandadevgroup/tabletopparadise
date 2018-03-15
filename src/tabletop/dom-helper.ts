export class DomHelper {
	$frag = $(document.createDocumentFragment());

	constructor(protected $container: JQuery<HTMLElement>) {}

	resizeEl($el: JQuery<HTMLElement>, options: any) {
		$el.velocity({
			translateZ: 0, // Force hardware acceleration
			...options
		});
	}

	renderFrag() {
		this.$container.append(this.$frag);
	}
}
