import * as $ from "jquery";
import { CardGame, CardGameOptions } from "./card-game";

const tabletop = new CardGame(
	$("#game"),
	{
		players: 2,
		initialHandSize: 13
	}
);
