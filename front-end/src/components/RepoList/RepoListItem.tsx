import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Progress from '../progress/Progress';
import { RepogotchiType } from '../../state/repo';
import { Link, useParams } from 'react-router-dom';
import { RepogotchiDisplay } from '../Repogotchi';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InfoIcon from '@mui/icons-material/Info';

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.5rem',
    fontWeight: 50,
    marginTop: -5
}

const baseIconTheme = {
    width: 35,
    height: 'auto',
    transitionDuration: '200ms',
    position: 'absolute' as 'absolute',
    left: '96%',
    cursor: 'pointer',
    marginTop: 2.5
}

export type RepoListItemProps = {
    repo: RepogotchiType
}

export default function RepoListItem(props: RepoListItemProps) {
    const [elevation, setElevation] = useState(10);
    const [removeHover, setRemoveHover] = useState(false);

    const healthPercent = Math.floor(props.repo.CurrentHealth / props.repo.MaxHealth * 100);
    const affPercent = Math.floor(props.repo.Affection / props.repo.MaxAffection * 100);

    const removeIconTheme = {
        ...baseIconTheme,
        // top: -5,
        color: removeHover ? 'red' : 'red',
    }

    const infoIconTheme = {
        ...baseIconTheme,
        top: 40,
        color: true ? 'gray' : 'gray'
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ height: 45, padding: 4, ml: 5, borderRadius: 5, display: 'flex', width: '90%' }} elevation={elevation}
                onMouseEnter={() => setElevation(20)}
                onMouseLeave={() => setElevation(10)}
            >
                <Link to={"/repo/" + props.repo.GithubName} style = {{ textDecoration: 'none', width: '95%'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', textDecoration: 'none', color: 'black', width: 'inherit' }}>
                        <Box sx={{ ml: -10, mt: -7, position: "absolute" }}>
                            <RepogotchiDisplay repo={props.repo} imgWidth={215} containerHeight={200} />
                        </Box>
                        <Box sx={{ ml: 15, width: 800, overflow: 'hidden' }}>
                            <Typography variant="h5">{props.repo.GithubName}</Typography>
                            <Typography sx={{color: "gray"}}>{props.repo.PersonalName}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" sx={{ width: '100%', mt: -1, ml: 3, overflow: 'clip' }}>
                            <Box sx={{ width: '50%' }}>
                                <Progress title="" bio="Health" progress={healthPercent} />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Progress title="" bio="Affection" progress={affPercent} />
                            </Box>
                        </Box>
                    </Box>
                </Link>
                <InfoIcon sx={infoIconTheme} onMouseEnter={() => null} onMouseLeave={() => null} />
                <RemoveCircleIcon sx={removeIconTheme} onMouseEnter={() => null} onMouseLeave={() => null} />
            </Paper>
        </ThemeProvider>
    )
}