
export class Action {
    private _data:object;
    private _name:string;
    constructor(name:string, data:object) {
        this._data = data;
        this._name = name;
    }

    public val() {
        return this._data;
    }
    get name() {
        return this._name;
    }
}
