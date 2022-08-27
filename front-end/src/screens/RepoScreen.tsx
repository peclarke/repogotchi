import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProgressBars from '../components/progress/ProgressBars';
import NameAge from '../components/NameAge';
import Details from '../components/Details';
import Repogotchi from '../components/Repogotchi';
import { Link, useParams } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config/firebase';
import { RepogotchiType } from '../state/repo';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import RepoSettingsDialog from '../dialogs/RepoSettingsDialog';

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

    const [settings, setSettings] = useState(false);

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


    const updatePersonalName = async (text: string) => {
        const app = initializeApp(firebaseConfig);
        const db: Firestore = getFirestore(app);

        setRep({
            ...rep,
            PersonalName: text
        });

        // update firebase
        const docRef = doc(db, "users/peclarke/repogotchis/" + id);
        await updateDoc(docRef, {
            PersonalName: text
        })
        
        
    }

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box sx = {{ ml: 5 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-evenly" sx = {{ mt: 5}}>
                            <Link to="/" style = {{ textDecoration: "none"}}><Button variant="contained">Back</Button></Link>
                            <Button onClick={() => setSettings(true)} variant="contained">Settings</Button>
                            <RepoSettingsDialog open={settings} onClose={() => setSettings(false)} action={(text: string) => updatePersonalName(text)}/>
                        </Box>
                        <br></br>
                        <hr style = {{ opacity: 0.4}}></hr>
                        <ProgressBars repo={rep}/>
                        <NameAge name={rep.PersonalName} age={rep.Age}/>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx = {{ ml: 5 }}>
                        <Repogotchi name={rep.GithubName} repo={rep} />
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