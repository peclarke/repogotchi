

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
import FadeIn from 'react-fade-in';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';

// const { palette } = createTheme();
// const { augmentColor } = palette;
// const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

// const theme = createTheme({
//     palette: {
//         jazz: createColor("#e66465"),
//         funk: createColor("#9198e5")
//     }
// });



const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.4rem',
    fontWeight: 200,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic'
}

theme.typography.h6 = {
    fontSize: '1.4rem',
    fontWeight: 400,
    marginTop: 150,
    textAlign: 'center'
}

// theme.palette = {

// }

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

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user")) {
            nav('/home')
        }
    }, [])

    const nav = useNavigate();

    const updateUser = (e: any) => {
        setUser(e.target.value);
    }

    const updatePass = (e: any) => {
        setPass(e.target.value);
    }

    const login = () => {
        // put user in local storage
        localStorage.setItem('user', user);
        nav('/home');
    }

    const exampleRepo: RepogotchiType = {
        GithubName: "FirebaseAnalyticsProject",
        PersonalName: "Desmond The Moon Bear",
        Age: "",
        Languages: [""],
        MaxHealth: 100,
        CurrentHealth: 90,
        CommitProgress: 100,
        LastCommit: "",
        Level: 0,
        Birthdate: "",
        LevelProgress: 0,
        LevelReq: 0,
        LastVisit: "",
        Affection: 10,
        MaxAffection: 20,
        Body: 0,
        Eyes: 0,
        Mouth: 0,
        Accessory: 0,
        Ears: 0,
        Colour: "white",
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box sx={{ ml: 5 }} >
                            <Typography variant="h2" sx={{ ml: 13, mt: 3 }}>TamaGit</Typography>
                            <Typography variant="h5">
                                Never forget about your beloved projects again 
                            </Typography>
                            <Typography variant="h6">
                                Get started...
                            </Typography>
                            <Box sx = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', height: 125, mt: 3}}>
                                <TextField id="username-input" label="Github Username" variant="outlined" sx = {{ width: '80%' }} onChange={(e) => updateUser(e)} />
                                <TextField id="password-input" label="New Password" variant="outlined" sx = {{ width: '80%' }} type="password"/>
                            </Box>
                            <Box sx = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', mt: 3}} onChange={(e) => updateUser(e)}>
                                <Button variant="contained" sx={styles.button} size="large" onClick={login}>Login</Button>
                            </Box>
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
                                    <img src={repogotchi} alt="An example of a repogotchi" style={{ width: width * 0.4 }} />
                                </Box>
                                <RepoListItem repo={exampleRepo} />
                            </FadeIn>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}


// jazz: createColor("#e66465"),
//         funk: createColor("#9198e5")