import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProgressBars from '../components/progress/ProgressBars';
import NameAge from '../components/NameAge';
import Details from '../components/Details';
import Repogotchi from '../components/Repogotchi';
import { useNavigate, useParams } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config/firebase';
import { RepogotchiType } from '../state/repo';
import RepoButtons from '../components/RepoButtons';
import useWindowDimensions from '../hooks/useWindowDimensions';

export type RepoScreenProps = {

}

export default function RepoScreen(props: RepoScreenProps) {
    const [rep, setRep] = useState<RepogotchiType>({
        GithubName: "",
        PersonalName: "",
        Age: 0,
        Languages: [""],
        MaxHealth: 100,
        CurrentHealth: 100,
        CommitProgress: 100,
        LastCommit: "",
        Level: 0,
        Birthdate: "",
        LevelProgress: 0,
        LevelReq: 0,
        LastVisit: "",
        Affection: 0,
        MaxAffection: 0,
        Body: 0,
        Eyes: 0,
        Mouth: 0,
        Accessory: 0,
        Ears: 0,
        Colour: "white",
    });
    const { height } = useWindowDimensions();

    const { id } = useParams();

    const nav = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            nav("/")
        }

        getInfo();
    }, [])

    const getInfo = async () => {
        const app = initializeApp(firebaseConfig);
        const db: Firestore = getFirestore(app);

        // console.log("users/peclarke/repogotchis/" + id)

        const stuff = async () => {
            const docRef = doc(db, "users/" + localStorage.getItem("email") + "/repogotchis/" + id);
            const snapDoc = await getDoc(docRef);
            const data = snapDoc.data();
            if (data) {
                setRep({
                    GithubName: data.GithubName,
                    PersonalName: data.PersonalName,
                    Age: data.Age,
                    Languages: data.Languages,
                    MaxHealth: data.MaxHealth,
                    CurrentHealth: data.CurrentHealth,
                    CommitProgress: data.CommitProgress,
                    LastCommit: data.LastCommit,
                    Level: data.Level,
                    Birthdate: data.Birthdate,
                    LevelProgress: data.LevelProgress,
                    LevelReq: data.LevelReq,
                    LastVisit: data.LastVisit,
                    Affection: data.Affection,
                    MaxAffection: data.MaxAffection,
                    Body: data.Body,
                    Eyes: data.Eyes,
                    Mouth: data.Mouth,
                    Accessory: data.Accessory,
                    Ears: data.Ears,
                    Colour: data.Colour,
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
        const docRef = doc(db, "users/" + localStorage.getItem("user") + "/repogotchis/" + id);
        await updateDoc(docRef, {
            PersonalName: text
        })


    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box sx={{ background: "linear-gradient(#e66465, #9198e5)", height: height, mt: -5, pt: 5 }}>
                            {/* <RepoButtons updateName={updatePersonalName}/> */}
                            <ProgressBars repo={rep} />
                            <NameAge name={rep.PersonalName} age={rep.Age.toString()} />
                            <RepoButtons updateName={updatePersonalName} />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ ml: 5 }}>
                            <Repogotchi name={rep.GithubName} repo={rep} />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ ml: 5, background: "linear-gradient(#e66465, #9198e5)", height: height, mt: -5, pt: 5 }}>
                            <Details languages={rep.Languages} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}