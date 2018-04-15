import { ServerConnection, Action } from "../server";

export class Options {
	
    static init() {
        let server = new ServerConnection("test");
        let tenSecondsFromNow:Date = new Date();
        tenSecondsFromNow.setSeconds(tenSecondsFromNow.getSeconds() + 10);
        $("#options-reset").click(function() {
            server.set("actions", null);
            server.set("deckSynced", false);
            server.dispatch(new Action("reload",{
                parent:server.auth().currentUser.uid,
                reason:"deck_reset",
                completed:[]
            }, tenSecondsFromNow.getTime(), Action.ONE_TIME_REQUEST))
        });
    }
}
