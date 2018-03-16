import { Action } from "./action";
import  Utils  from "../util";

import * as firebase from 'firebase';
import * as action from "./action";

export class ServerConnection {
    // Speed up calls to hasOwnProperty
    private _gameid: string;

    private _watching: {
        [key: string]: {
            callback: ((action?: Action) => void)
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

    public on(event: string, callback: ((action?: Action) => void)) {
        let options = {
            callback: callback,
            event: event
        }
        if (Utils.isEmpty(this._watching)) {
            let watching = this._watching;

            firebase.database().ref("/game/" + this._gameid + "/actions/").on("child_added", function (snapshot) {
                var data: {
                    name: string,
                    action: object

                } = snapshot.val();

                if (!(watching.hasOwnProperty(data.name))) {
                    return;
                }
                //otherwise run callback
                watching[data.name].callback(new Action(data.name, data.action));
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

        if (Utils.isEmpty(this._watching)) {
            firebase.database().ref("/game/" + this._gameid + "/actions/").off();
        }

        if (options)
            return options;//used for off
    }

    public push(action: Action) {
        console.log(action.name)
        return firebase.database().ref("/game/" + this._gameid + "/actions/").push({
            name: action.name,
            action: action.val()
        });
    }

}

