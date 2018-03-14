export class DomHelper {
	$frag = $(document.createDocumentFragment());

	constructor(protected $container: JQuery<HTMLElement>) {}

	renderFrag() {
		this.$container.append(this.$frag);
	}
}
