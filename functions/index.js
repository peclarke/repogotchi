const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.feedRepogotchi = functions.region("australia-southeast1").https.onRequest(async (req, res) => {
    const username = req.body.pusher.name;
    const repository = req.body.repository.name;
    const commitList = req.body.commits;
    const lastCommitMS = Date.parse(req.body.head_commit.timestamp);
    const lastUpdated = admin.firestore.Timestamp.fromMillis(lastCommitMS);

    // Find user document 
    const userRef = admin.firestore().collection("users").doc(username);
    const user = await userRef.get();
    if (!user.exists) {
        // if the pusher isnt the same as the person making commits, stuff gets weird. 
        // limitation of non-relational database 
        res.json({ result: "pusher not registered" })
    } else {
        // find repogotchi document
        const repRef = userRef.collection("repogotchis").doc(repository);
        const repogotchi = await repRef.get();
        if (!repogotchi.exists) {
            res.json({ result: "repogotchi not registered" });
        } else {
            // update the last-updated 
            await repRef.update({ last_commit: lastUpdated });
            // add commits to the repogotchi's commit list 
            for (var commitIndex in commitList) {
                var commit = commitList[commitIndex];
                var commitTimeMS = Date.parse(commit.timestamp);
                // Only add commits where the commit is distinct and the commit's author is the same as the pusher 
                if (commit.distinct && commit.author.name === username) {
                    await repRef.collection("commits").add(
                        { id: commit.id, time: admin.firestore.Timestamp.fromMillis(commitTimeMS) });
                }
            }
            res.json({ result: "success" });
        }
    }
});
