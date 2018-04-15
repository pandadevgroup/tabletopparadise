export class Action {
	meta: {
		timestamp: number,
		timestampString: string,
		type: string,
		fufilledBy?: string[],
		expireDate?: number,
		expireDateString?: string,
		expires: boolean,
		expired?: boolean,
		key: string
	};
	static ONE_TIME_REQUEST = "one_time_request";//one time action, like reloading
	static GAME_ACTION = "game_action";//required to build the game
	constructor(public event: string, public payload: any, expireDate?: number | null, type?: string) {
		this.meta = {
			expires: false,
			timestamp: Date.now(),//timestamps will be overwritten at time of push
			timestampString: Date(),
			key: "[UNPUSHED]",
			type: Action.GAME_ACTION//defualt
		}
		if (expireDate) {
			this.meta.expires = true;
			this.meta.expireDate = expireDate;
			this.meta.expireDateString = new Date(expireDate).toDateString();
		}
		if (type)
			this.meta.type = type;
	}

}
