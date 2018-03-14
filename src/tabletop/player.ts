export class Player {
	protected $player: JQuery<HTMLElement>;

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected name?: string
	) {}

	renderContainer(numPlayers: number) {
		this.$player = $(`
			<div class="player player--${numPlayers}">
				<span class="player__name">${this.name}</span>
			</div>
		`);
		this.$container.append(this.$player);
	}
}
