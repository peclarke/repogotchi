

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import RepoListItem from '../components/RepoList/RepoListItem';
import useWindowDimensions from '../hooks/useWindowDimensions';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RepogotchiType } from '../state/repo';

import repogotchi from '../assets/example_asset.png';
import repogotchi2 from '../assets/example_asset_2.png';
import repogotchi3 from '../assets/example_asset_3.png';
import repogotchi4 from '../assets/example_asset_4.png';

import FadeIn from 'react-fade-in';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';

// import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, getDoc, doc, updateDoc, collection, getDocs, setDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config/firebase';
// import { getAuth } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { Login } from '../components/Login';

const repos = [repogotchi, repogotchi2, repogotchi3, repogotchi4];

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.4rem',
    fontWeight: 200,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic'
}

theme.typography.h2 = {
    fontSize: '3rem',
    fontWeight: 400,
    marginTop: 20,
    textAlign: 'center',
    overflowWrap: 'break-word'
}

// theme.palette = {

// }

const exampleRepo: RepogotchiType = {
    GithubName: "MyFunRepository",
    PersonalName: "Mittens",
    Age: 9,
    Languages: [""],
    MaxHealth: 100,
    CurrentHealth: 70,
    CommitProgress: 100,
    LastCommit: "",
    Level: 0,
    Birthdate: "",
    LevelProgress: 0,
    LevelReq: 0,
    LastVisit: "",
    Affection: 15,
    MaxAffection: 20,
    Owner: "",
    Body: 1,
    Eyes: 0,
    Mouth: 0,
    Accessory: 0,
    Ears: 2,
    Colour: "pink",
}

export const styles = {
    button: {
        color: theme.palette.getContrastText("#9e5482"),
        backgroundColor: "#9e5482",
        "&:hover": {
            backgroundColor: "#8c4170",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                backgroundColor: "#8c4170"
            }
        },
        marginTop: 3
    }
}

export type LandingScreenProps = {
}

export default function LandingScreen(props: LandingScreenProps) {
    const { width, height } = useWindowDimensions();

    const [repoIndex, setRepoIndex] = useState(0);

    const app = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
    const auth = getAuth();

    useEffect(() => {
        if (localStorage.getItem("email")) {
            nav('/home')
        } else {
            // signOut(auth).then(() => {
            //     localStorage.clear();
            //     nav("/")
            //     // Sign-out successful.
            //   }).catch((error) => {
            //     // An error happened.
            //   });
        }
        setRepoIndex(Math.floor(Math.random() * repos.length));
    }, [])

    const nav = useNavigate();

    return (
        <form>
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box sx={{ ml: 5 }} >
                                <Typography variant="h2">TamaGit</Typography>
                                <Typography variant="h5">
                                    Never forget about your beloved projects again
                                </Typography>

                                <Login />
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{
                                justifyContent: 'center', display: 'flex',
                                flexDirection: 'column', height: height, background: "linear-gradient(#e66465, #9198e5)",
                                paddingLeft: 4, paddingRight: 4
                            }}>
                                <FadeIn>
                                    {/* Media queries here! */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={repos[repoIndex]} alt="An example of a repogotchi" style={{ width: width * 0.4 }} />
                                    </Box>
                                    <RepoListItem repo={exampleRepo} />
                                </FadeIn>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        </form>
    )
}