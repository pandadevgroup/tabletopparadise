import { Event } from "./event";
import { Action } from "./action";
import * as firebase from 'firebase';
import * as action from "./action";

export class Mutiplayer {
    // Speed up calls to hasOwnProperty
    private _gameid: string;
    private isEmpty(obj) {
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
    private _watching: {
        [key: string]: {
            callback: ((event?: Event) => void)
        }
    };

    constructor(gameid) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAulUtZj74h98YWLWJ9uZPn1nI0N_480HQ",
            authDomain: "tabletop-paradise.firebaseapp.com",
            databaseURL: "https://tabletop-paradise.firebaseio.com",
            projectId: "tabletop-paradise",
            storageBucket: "tabletop-paradise.appspot.com",
            messagingSenderId: "941646063027"
        };
        firebase.initializeApp(config);
        this._gameid = gameid;
        this._watching = {};
    }

    public on(event: string, callback: ((event?: Event) => void)) {
        let options = {
            callback: callback,
            event: event
        }
        if (this.isEmpty(this._watching)) {
            let watching = this._watching;
            
            firebase.database().ref("/game/" + this._gameid + "/actions/").on("value", function (snapshot) {
                var data: {
                    event: string,
                    action: object

                } = snapshot.val();
                if (!(watching.hasOwnProperty(data.event))) {
                    return;
                }
                //otherwise run callback
                
                watching[data.event].callback(new Event(new Action(data.event, data.action), data.event));
            });
        }
        this._watching[event] = options;
        return options;//used for off
    }
    public off(options: string | {
        event: string,
        callback: ((event?: Event) => void)
    }) {

        delete this._watching[(typeof options == "string" ? options : options.event)];

        if (this.isEmpty(this._watching)) {
            firebase.database().ref("/game/" + this._gameid + "/actions/").off();
        }

        if (options)
            return options;//used for off
    }

    public push(action: Action) {
        return firebase.database().ref("/game/" + this._gameid + "/actions/").push({
            name:action.name,
            action:action.val()
        });
    }

}

