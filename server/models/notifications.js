let not = {
    notifications: (user) => {
    var apn = require('apn');
        var options = {
            token: {
            key: "C:/Users/Connor/Desktop/bubble/AuthKey_ZZ8756DRZF.p8",
            keyId: "ZZ8756DRZF",
            teamId: "EJGE4CL6PT"
            },
            production: false
        };
        
        let deviceToken = "7cc2d5cfce09551630b142b7e476aaeaabddea1adca249b7c37ee7715bdc9b1f"

        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 3;
        note.sound = "ping.aiff";
        note.alert = "\uD83D\uDCE7 \u2709 "+ user +" You have a new message";
        note.payload = {'messageFrom': 'John Appleseed'};
        note.topic = "com.companyname.bubble";

        var apnProvider = new apn.Provider(options);
        console.log(note)
        apnProvider.send(note, deviceToken).then( (result) => {
            console.log(result)
        });
    }
}
module.exports = not