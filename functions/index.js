const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.feedRepogotchi = functions.region("australia-southeast1").https.onRequest(async (req, res) => {
    const username = req.body.pusher.name;
    const repository = req.body.repository.name;
    const commitList = req.body.commits;

    const userCollection = admin.firestore().collection("users");
    const userQuery = await userCollection.where("github", "==", username).get();
    if (userQuery.size < 1) {
        // if the pusher isnt the same as the person making commits, stuff gets weird. 
        // limitation of non-relational database 
        res.json({ result: "pusher not registered" })
    }
    // Should only be one user with that github name, fingers crossed ..?
    userQuery.forEach(async (user) => {
        // find repogotchi document
        const repRef = user.ref.collection("repogotchis").doc(repository);
        const repogotchi = await repRef.get();

        if (!repogotchi.exists) {
            res.json({ result: "repogotchi not registered" });
        } else {
            // get current field values
            var data = repogotchi.data();
            var level = data.Level;
            var health = data.CurrentHealth;
            var maxHealth = data.MaxHealth;
            var levelProgress = data.LevelProgress;
            var levelReq = data.LevelReq;

            const levelReqs = {
                1: 20,
                2: 50,
                3: 100
            }

            // feed the repogotchi - each commit will increase either its health or level
            for (var commitIndex in commitList) {
                var commit = commitList[commitIndex];
                // Only add commits where the commit is distinct and the commit's author is the same as the pusher 
                if (commit.distinct && commit.author.name === username) {
                    // Commit was done by the user - feed the repogotchi
                    if (health < maxHealth) {
                        // Add health, 1 per commit
                        health += 1;
                    } else if (levelProgress < levelReq) {
                        // Already at max health => contributes to levelling up
                        levelProgress += 1;
                    } else if (level < 3) {
                        level += 1;
                        levelProgress = 0;
                        levelReq = levelReqs[level];
                        maxHealth = levelReq;
                        health = maxHealth;
                    } else {
                        level = 4;
                    }
                    // If already at level 3, cant level up anymore
                }
            }
            // Now that updates have been made, update in firebase
            await repRef.update({
                Level: level,
                CurrentHealth: health,
                MaxHealth: maxHealth,
                LevelProgress: levelProgress,
                LevelReq: levelReq
            });
            res.json({ result: "success" });
        }
    });
});

exports.decayOnDemand = functions.region("australia-southeast1").https.onRequest(async (_, res) => {
    const users = await admin.firestore().collection("users").get();
    const now = await admin.firestore.Timestamp.now().toDate();

    users.forEach(async (user) => {

        let repogotchis = await user.ref.collection("repogotchis").get();
        repogotchis.forEach(async (rep) => {
            // Decay repogotchi health
            let data = rep.data();
            let health = data.CurrentHealth;
            let affection = data.Affection;
            let age = data.Age + 1;
            let lastVisit = data.LastVisit.toDate();
            if (health > 0) {
                health -= 1;
            }
            if ((now.getTime() - lastVisit.getTime()) > 86400000) {
                // If the owner hasnt visited in more than a day
                if (affection > 0) {
                    affection -= 1;
                }
            } else {
                if (affection < data.MaxAffection) {
                    affection += 2;
                }
            }
            await rep.ref.update({ CurrentHealth: health, Affection: affection, Age: age });
        });
    });
    res.json({ result: "done" });
});

exports.decayDaily = functions.region("australia-southeast1").pubsub.schedule("0 1 * * *").onRun(async (_) => {
    const users = await admin.firestore().collection("users").get();
    const now = await admin.firestore.Timestamp.now().toDate();

    users.forEach(async (user) => {

        let repogotchis = await user.ref.collection("repogotchis").get();
        repogotchis.forEach(async (rep) => {
            // Decay repogotchi health
            let data = rep.data();
            let health = data.CurrentHealth;
            let affection = data.Affection;
            let age = data.Age + 1;
            let lastVisit = data.LastVisit.toDate();
            if (health > 0) {
                health -= 1;
            }
            if ((now.getTime() - lastVisit.getTime()) > 86400000) {
                // If the owner hasnt visited in more than a day
                if (affection > 0) {
                    affection -= 1;
                }
            } else {
                if (affection < data.MaxAffection) {
                    affection += 2;
                }
            }
            await rep.ref.update({ CurrentHealth: health, Affection: affection, Age: age });
        });
    });
    return null;
});
