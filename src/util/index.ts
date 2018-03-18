export default class Utils {
	static random(from: number, to: number) {
		return Math.floor(Math.random() * (to - from)) + from;
	}
	static getGameID(callback:((result:string | boolean) => void), count?: number) {
		if (!count) {
			count = 0;
		}
		//some error, generated 100 random ID's and still didn't work.
		if (count > 100) {
			callback(false);
		}
		else {
			// no captial I, lowercase l, captial o, and no zero(0) to prevent confusion(in the url bar both look the same)
			// generates 4 digit random ID from pool of 22 chars, not including the following four charcters: iIO0
			var chars = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
			var result = "";
			for (var i = 4; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
			//var invalid = true;
			firebase.database().ref("/game/" + result).once("value").then(function(snapshot) {
				if (snapshot.val() === null) {
					callback(result);
				}
				else {
					Utils.getGameID(callback, count + 1);
				}
			});
		}
	}
}
