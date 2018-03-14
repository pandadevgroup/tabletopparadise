export default class Utils {
	static random(from: number, to: number) {
		return Math.floor(Math.random() * (to - from)) + from;
	}
}
