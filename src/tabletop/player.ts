export class Player {
	private $player: JQuery<HTMLElement>;

	constructor(
		private $container: JQuery<HTMLElement>,
		private name?: string
	) {}

	renderContainer(numPlayers: number) {
		this.$player = this.$container.append(`
			<div class="player player--${numPlayers}">
				<span class="player__name">${this.name}</span>
			</div>
		`);
	}
}
