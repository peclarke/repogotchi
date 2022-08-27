import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import ActionRepoDialog from '../../dialogs/ActionRepoDialog';
import { RepogotchiType } from '../../state/repo';
import BigButton from './BigButton';

import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, getDoc, addDoc, Firestore, doc, getDocs } from 'firebase/firestore/lite';

export type ManageReposProps = {

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
    useEffect(() => add_repo("https://github.com/peclarke/fullstack-forum"), [])

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
                            Age: new Date(json['created_at']).toDateString(),
                            Languages: Object.keys(jsonLang),
                            HealthPercent: 100,
                            WellbePercent: 100,
                            CommitProgress: 100
                        }

                        const userStuff = async () => {
                            const repoCol = collection(db, "users/peclarke/repogotchis");
                            const docRef = await addDoc(repoCol, repo);
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
            <BigButton action={openAddRepo} type="add"/>
            <BigButton action={openRemoveRepo} type="remove"/>
            <ActionRepoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} type={dialogType} action={() => null}/>
        </Box>
    )
}