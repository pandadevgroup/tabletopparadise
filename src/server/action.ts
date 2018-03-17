export class Action {
    meta: {
		timestamp: number,
		timestampString: string
    };
    constructor(public type: string, public payload: any) {}
}
