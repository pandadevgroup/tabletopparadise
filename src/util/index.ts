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
	static isEmpty(obj) {
		//https://stackoverflow.com/a/4994244/5511561
	
		let hasOwnProperty = Object.prototype.hasOwnProperty;
	
		// null and undefined are "empty"
		if (obj == null) return true;
	
		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length > 0) return false;
		if (obj.length === 0) return true;
	
		// If it isn't an object at this point
		// it is empty, but it can't be anything *but* empty
		// Is it empty?  Depends on your application.
		if (typeof obj !== "object") return true;
	
		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and valueOf enumeration bugs in IE < 9
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) return false;
		}
	
		return true;
	}
}
