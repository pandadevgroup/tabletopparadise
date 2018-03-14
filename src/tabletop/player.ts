export class Player {
	protected $player: JQuery<HTMLElement>;

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected name?: string
	) {}

	renderContainer(playerNum: number, numPlayers: number) {
		this.$player = $(`
			<div class="player player--${playerNum}of${numPlayers}">
				<span class="player__name">${this.name}</span>
			</div>
		`);
		this.$container.append(this.$player);
	}
}
