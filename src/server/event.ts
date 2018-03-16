import { Action } from "./action";


export class Event {
    private _action:Action;
    private _name: string;


	constructor(action: Action, name: string) {
        this._action = action;
        this._name = name;
    }

    get action() {
        return this._action;
    }
    
    get name() {
        return this._name;
    }

}

