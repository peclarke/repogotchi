import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import ActionRepoDialog from '../../dialogs/ActionRepoDialog';
import { RepogotchiType } from '../../state/repo';
import BigButton from './BigButton';

import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, getDoc, addDoc, Firestore, doc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import WizardDialog from '../../dialogs/WizardDialog';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import HelpDialog from '../../dialogs/HelpDialog';
import generate, { SpriteGeneration } from '../../generation/generate';

export type ManageReposProps = {
    updateRepos: () => void;
    allowAdds: boolean;
}

export default function ManageRepos(props: ManageReposProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [wizard, setWizard] = useState(false);
    const [help, setHelp] = useState(false);

    const [dialogType, setDialogType] = useState<"add" | "remove">("add");

    const openAddRepo = () => {
        setDialogType("add");
        setDialogOpen(true);
    }

    const openRemoveRepo = () => {
        setDialogType("remove");
        setDialogOpen(true);
    }

    const handleAction = (res: string) => {
        if (dialogType === "add") {
            add_repo(res);
        } else {
            remove_repo(res);
        }
    }

    // useEffect(() => get_repo_info("https://github.com/peclarke/fullstack-forum"), [])
    // useEffect(() => add_repo("https://github.com/peclarke/fullstack-forum"), [])

    const add_repo = (githubUrl: string) => {
        setWizard(true);

        const app = initializeApp(firebaseConfig);
        const db: Firestore = getFirestore(app);

        const delimited = githubUrl.split("/").reverse();
        const repoName = delimited[0];
        const username = delimited[1];

        const baseUrl = "https://api.github.com/repos/" + username + "/" + repoName
        fetch(baseUrl)
            .then(res => res.json())
            .then((json) => {
                fetch(baseUrl + "/languages")
                    .then(res => res.json())
                    .then((jsonLang) => {
                        const sprite: SpriteGeneration = generate();
                        const repo: RepogotchiType = {
                            GithubName: json['name'],
                            PersonalName: "Bobbithy",
                            Age: "0",
                            Languages: Object.keys(jsonLang),
                            MaxHealth: 100,
                            CurrentHealth: 100,
                            CommitProgress: 100,
                            LastCommit: "",
                            Level: 1,
                            Birthdate: new Date(json['created_at']).toDateString(),
                            LevelProgress: 0,
                            LevelReq: 20,
                            LastVisit: "",
                            Affection: 10,
                            MaxAffection: 10,
                            Body: sprite.body,
                            Eyes: sprite.eyes,
                            Mouth: sprite.mouth,
                            Accessory: sprite.accessory,
                            Ears: sprite.ears,
                            Colour: sprite.colour,
                        }

                        const userStuff = async () => {
                            // const repoCol = collection(db, "users/peclarke/repogotchis");
                            const repoDoc = doc(db, "users/peclarke/repogotchis", json['name'])
                            // const docRef = await addDoc(repoCol, repo);
                            const docRef = await setDoc(repoDoc, repo)
                            props.updateRepos();
                        }

                        userStuff();
                    }, (err) => {
                        console.log(err)
                    })
            }, (err) => {
                console.log(err)
            })
    }

    const remove_repo = (githubName: string) => {
        const app = initializeApp(firebaseConfig);
        const db: Firestore = getFirestore(app);

        const stuff = async () => {
            const docRef = doc(db, "users/peclarke/repogotchis/" + githubName);
            await deleteDoc(docRef);
            props.updateRepos();
        }

        stuff();
    }

    return (
        <>
            {/* <Paper elevation={8} sx = {{ mt: 20, mr: 20, ml: -5, pb: 4 }}> */}
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ mr: 6, mt: 20 }}>
                {props.allowAdds ? <BigButton action={openAddRepo} type="add" /> : null}
                <BigButton action={openRemoveRepo} type="remove" />

                <ActionRepoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} type={dialogType} action={(text: string) => handleAction(text)} />
                <WizardDialog open={wizard} onClose={() => setWizard(false)} />
                <HelpDialog open={help} onClose={() => setHelp(false)} />
            </Box>
            {/* </Paper> */}

            {/* <Paper sx = {{ pt: 0, pb: 2}}> */}
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="65%" sx={{ mt: 20, ml: 7 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => setWizard(true)}>Repo Wizard</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => setHelp(true)} sx={{ width: '100%' }}>Help</Button>
                    </Grid>
                </Grid>
            </Box>
            {/* </Paper> */}
        </>
    )
}