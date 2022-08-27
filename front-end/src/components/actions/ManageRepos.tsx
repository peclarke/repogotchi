import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import ActionRepoDialog from '../../dialogs/ActionRepoDialog';
import { RepogotchiType } from '../../state/repo';
import BigButton from './BigButton';

import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, getDoc, addDoc, Firestore, doc, getDocs } from 'firebase/firestore/lite';

export type ManageReposProps = {
    updateRepos: () => void;
}

export default function ManageRepos(props: ManageReposProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<"add" | "remove">("add");

    const openAddRepo = () => {
        setDialogType("add");
        setDialogOpen(true);
    }

    const openRemoveRepo = () => {
        setDialogType("remove");
        setDialogOpen(true);
    }

    // useEffect(() => get_repo_info("https://github.com/peclarke/fullstack-forum"), [])
    // useEffect(() => add_repo("https://github.com/peclarke/fullstack-forum"), [])

    const add_repo = (githubUrl: string) => {
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
                            Body: 0,
                            Eyes: 0,
                            Mouth: 0,
                            Accessory: 0,
                            Ears: 0,
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

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <BigButton action={openAddRepo} type="add" />
            <BigButton action={openRemoveRepo} type="remove" />
            <ActionRepoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} type={dialogType} action={(text: string) => add_repo(text)} />
        </Box>
    )
}