import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProgressBars from '../components/progress/ProgressBars';
import NameAge from '../components/NameAge';
import Details from '../components/Details';
import Repogotchi from '../components/Repogotchi';
import { useParams } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, getDoc, doc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config/firebase';
import { RepogotchiType } from '../state/repo';

export type RepoScreenProps = {

}

export default function RepoScreen(props: RepoScreenProps) {
    const [rep, setRep] = useState<RepogotchiType>({
        GithubName:   "",
        PersonalName: "",
        Age:          "",
        Languages:    [""],
        MaxHealth:    100,
        CurrentHealth: 100,
        CommitProgress: 100,
        LastCommit:     "",
        Level: 0,
        Birthdate: "",
        LevelProgress: 0,
        LevelReq: 0,
        LastVisit: "",
        Affection: 0,
        MaxAffection: 0,
    });

    const { id } = useParams();

    useEffect(() => {
        getInfo();
    }, [])

    const getInfo = async () => {
        const app = initializeApp(firebaseConfig);
        const db: Firestore = getFirestore(app);

        console.log("users/peclarke/repogotchis/" + id)

        const stuff = async () => {
            const docRef = doc(db, "users/peclarke/repogotchis/" + id);
            const snapDoc = await getDoc(docRef);
            const data = snapDoc.data();
            if (data) {
                setRep({
                    GithubName:   data.GithubName,
                    PersonalName: data.PersonalName,
                    Age:          data.Age,
                    Languages:    data.Languages,
                    MaxHealth:    data.MaxHealth,
                    CurrentHealth:data.CurrentHealth,
                    CommitProgress: data.CommitProgress,
                    LastCommit:     data.LastCommit,
                    Level: data.Level,
                    Birthdate: data.Birthdate,
                    LevelProgress: data.LevelProgress,
                    LevelReq: data.LevelReq,
                    LastVisit: data.LastVisit,
                    Affection: data.Affection,
                    MaxAffection: data.MaxAffection,
                })
            }
        }
        stuff();
    }

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box sx = {{ ml: 5 }}>
                        <ProgressBars />
                        <NameAge name={rep.PersonalName} age={rep.Age}/>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx = {{ ml: 5 }}>
                        <Repogotchi name={rep.GithubName} commits={5} goal={10} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx = {{ ml: 5 }}>
                        <Details languages={rep.Languages}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}