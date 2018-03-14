export class Player {
	protected $player: JQuery<HTMLElement>;

	constructor(
		protected $container: JQuery<HTMLElement>,
		protected name?: string
	) {}

	renderPlayer(playerNum: number, numPlayers: number) {
		this.$player = $(`
			<div class="player player--${playerNum}of${numPlayers}">
				${this.generatePlayerCode()}
			</div>
		`);
		this.$container.append(this.$player);
	}

	protected generatePlayerCode() {
		return `<span class="player__name">${this.name}</span>`;
	}
}
