import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProgressBars from '../components/progress/ProgressBars';
import NameAge from '../components/NameAge';
import Details from '../components/Details';
import Repogotchi from '../components/Repogotchi';
import { useNavigate, useParams } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, getDoc, doc, updateDoc, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config/firebase';
import { RepogotchiType } from '../state/repo';
import RepoButtons from '../components/RepoButtons';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useDefaultRepogotchi } from '../hooks/useDefault';
import useGradient from '../hooks/useGradient';

export type RepoScreenProps = {

}

export default function RepoScreen(props: RepoScreenProps) {
    const [rep, setRep] = useState<RepogotchiType>(useDefaultRepogotchi());

    const [owner, setOwner] = useState("");

    const { height } = useWindowDimensions();

    const { id } = useParams();

    const nav = useNavigate();

    useEffect(() => {
        // setOwner(rep.Owner)
    }, [rep])

    useEffect(() => {
        if (!localStorage.getItem("email")) {
            nav("/")
        }

        // console.log(localStorage.getItem("user"));
        // console.log(localStorage.getItem("email"));

        getInfo();
    }, [])

    const getInfo = async () => {
        const app = initializeApp(firebaseConfig);
        const db: Firestore = getFirestore(app);

        const stuff = async () => {
            const docRef = doc(db, "users/" + localStorage.getItem("email") + "/repogotchis/" + id);
            const snapDoc = await getDoc(docRef);
            const data = snapDoc.data();
            // console.log(data);
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
                    Owner: data.Owner,
                    Body: data.Body,
                    Eyes: data.Eyes,
                    Mouth: data.Mouth,
                    Accessory: data.Accessory,
                    Ears: data.Ears,
                    Colour: data.Colour,
                })
                // setOwner(rep.Owner)
            }
        }

        const sortCommits = async () => {
            const docRefs = collection(db, "users/" + localStorage.getItem("email") + "/repogotchis/" + id + "/commits");
            const snapCollection = await getDocs(docRefs);
            // get most recent thing

            // compare it to today

            // either make GH query or not
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

    const gradient = useGradient();

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Box sx={{ background: gradient, height: height, mt: -5, pt: 5 }}>
                            <Repogotchi name={rep.GithubName} repo={rep} />
                            {/* <RepoButtons updateName={updatePersonalName}/> */}
                            {/* <ProgressBars repo={rep} />
                            <NameAge name={rep.PersonalName} age={rep.Age.toString()} />
                            <RepoButtons updateName={updatePersonalName} /> */}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ ml: 5 }}>
                            {/* <Repogotchi name={rep.GithubName} repo={rep} /> */}
                            <ProgressBars repo={rep} />
                            <NameAge name={rep.PersonalName} age={rep.Age.toString()} />
                            <RepoButtons updateName={updatePersonalName} />
                        </Box>
                    </Grid>
                    {/* <Grid item xs={4}>
                        <Box sx={{ ml: 5, background: gradient, height: height, mt: -5, pt: 5 }}>
                            <Details languages={rep.Languages} owner={owner}/>
                        </Box>
                    </Grid> */}
                </Grid>
            </Box>
        </>
    )
}