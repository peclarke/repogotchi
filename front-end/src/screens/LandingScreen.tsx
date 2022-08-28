import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import RepoListItem from '../components/RepoList/RepoListItem';
import useWindowDimensions from '../hooks/useWindowDimensions';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactImageAppear from 'react-image-appear';
import { RepogotchiType } from '../state/repo';

import repogotchi from '../assets/example_asset.png';
import FadeIn from 'react-fade-in';

export type LandingScreenProps = {

}

export default function LandingScreen(props: LandingScreenProps) {
    const { width, height } = useWindowDimensions();

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
        Colour: "red",
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box sx={{ ml: 5 }} >
                        <Typography variant="h2" sx={{ ml: 11, mt: 3 }}>TamaGit</Typography>

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
                                {/* <ReactImageAppear 
                                    src={repogotchi} alt="An example of a repogotchi" style = {{width: width * 0.4}}
                                    animationDuration="2s"
                                /> */}
                            </Box>
                            <RepoListItem repo={exampleRepo} />
                        </FadeIn>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}