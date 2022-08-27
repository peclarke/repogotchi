import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProgressBars from '../components/progress/ProgressBars';
import NameAge from '../components/NameAge';
import Details from '../components/Details';
import Repogotchi from '../components/Repogotchi';
import { useParams } from 'react-router-dom';

export type RepoScreenProps = {

}

export default function RepoScreen(props: RepoScreenProps) {
    const { id } = useParams();

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
                        <Repogotchi name="Functional-Programming-Assignment" commits={5} goal={10} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx = {{ ml: 5 }}>
                        <Details languages={["Python", "JavaScript", "HTML", "CSS", "Typescript", "Bash"]}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}