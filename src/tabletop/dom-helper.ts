export class DomHelper {
	$frag = $(document.createDocumentFragment());

	constructor(protected $container: JQuery<HTMLElement>) {}

	resizeEl($el: JQuery<HTMLElement>, options: jquery.velocity.Options) {
		$el.velocity(options);
	}

	renderFrag() {
		this.$container.append(this.$frag);
	}
}
