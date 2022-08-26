import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Progress from '../components/progress/Progress';
import ProgressBars from '../components/progress/ProgressBars';
import NameAge from '../components/NameAge';
import Details from '../components/Details';
import CommitProgress from '../components/progress/CommitProgress';

export type RepoScreenProps = {

}

export default function RepoScreen(props: RepoScreenProps) {

    // const [progressBars, setProgressBars] = useState([]);

    // useEffect(() => {
    //     const health = {
    //         "title": "Health",
    //         "bio": "Ability to meet your contribution goals",
    //         "progress": 40
    //     }

    //     const emotion = {
    //         "title": "Emotional Wellbeing",
    //         "bio": "Consistent contributions to your repository",
    //         "progress": 80
    //     }

    //     setProgressBars([health, emotion])
    // }, [])

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box sx = {{ ml: 5 }}>
                        <ProgressBars />
                        <NameAge name="Bobbithy" age="12 months"/>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx = {{ ml: 5 }}>
                        <CommitProgress progress={40}/>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx = {{ ml: 5 }}>
                        <Details languages={["Python", "JavaScript"]}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}