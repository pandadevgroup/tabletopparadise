export class Action {
    meta:{
        timestamp:string;
        utc:number;
    };
    constructor(public type: string, public payload: any) {}
}
