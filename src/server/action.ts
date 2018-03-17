export class Action {
    meta: {
        timestamp: number;
    };
    constructor(public type: string, public payload: any) {}
}
