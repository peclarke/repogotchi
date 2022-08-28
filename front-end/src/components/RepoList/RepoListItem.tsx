import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Progress from '../progress/Progress';
import { RepogotchiType } from '../../state/repo';
import { useParams } from 'react-router-dom';
import { RepogotchiDisplay } from '../Repogotchi';

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.5rem',
    fontWeight: 50,
    marginTop: -5
}


export type RepoListItemProps = {
    repo: RepogotchiType
}

export default function RepoListItem(props: RepoListItemProps) {
    const [elevation, setElevation] = useState(10);

    const healthPercent = Math.floor(props.repo.CurrentHealth / props.repo.MaxHealth * 100);
    const affPercent = Math.floor(props.repo.Affection / props.repo.MaxAffection * 100);

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ height: 45, padding: 4, ml: 5 }} elevation={elevation}
                onMouseEnter={() => setElevation(20)}
                onMouseLeave={() => setElevation(10)}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ ml: -10, mt: -7, position: "absolute" }}>
                        <RepogotchiDisplay repo={props.repo} imgWidth={200} containerHeight={200} />
                    </Box>
                    <Box sx={{ ml: 15, width: 800 }}>
                        <Typography variant="h5">{props.repo.GithubName}</Typography>
                        <Typography>{props.repo.PersonalName}</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" sx={{ width: '100%', mt: -1, ml: 3 }}>
                        <Box sx={{ width: '50%' }}>
                            <Progress title="" bio="Health" progress={healthPercent} />
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <Progress title="" bio="Affection" progress={affPercent} />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}