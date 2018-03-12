import * as $ from "jquery";
import { DrawingCardsGame } from "./games/drawing-cards";

const tabletop = new DrawingCardsGame($("#game") as JQuery<HTMLCanvasElement>);
