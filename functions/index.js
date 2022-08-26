const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

exports.feedRepogotchi = functions.https.onRequest(async (req, res) => {
    const username = req.body.pusher.name;
    const repository = req.body.repository.full_name;
    const commitList = req.body.commits;
    // TODO timestamp not working properly, gotta convert it to something
    const lastupdated = req.body.head_commit.timestamp; // ISO 8601

    //admin.firestore().collection('users').

    // Find user document
    const userRef = admin.firestore().collection('users').doc(username);
    const user = await userRef.get();
    if (!user.exists) {
        // if the pusher isnt the same as the person making commits, stuff gets weird.
        // limitation of non-relational database
        res.json({ result: 'pusher not registered' })
    } else {
        // find repogotchi document
        const repRef = userRef.collection('repogotchis').doc(repository);
        const repogotchi = await repRef.get();
        if (!repogotchi.exists) {
            res.json({ result: 'repogotchi not registered' })
        } else {
            // update the last-updated
            await repRef.update({ last_commit: lastupdated })
            // add commits to the repogotchi's commit list
            for (var commit in commitList) {
                var jsonCommit = JSON.parse(commit)
                repRef.collection('commits').add({ id: jsonCommit.commit_id, time: jsonCommit.timestamp })
            }
            res.json({ result: 'success ' })
        }
    }
});
