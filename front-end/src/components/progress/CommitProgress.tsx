import React, { useState } from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RepogotchiType } from '../../state/repo';
  
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
height: 15,
borderRadius: 8,
width: '100%',
[`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
},
[`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
},
}));

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.2rem',
    padding: 0,
    marginBottom: -18
}

theme.typography.h6 = {
    fontSize: '0.8rem',
    fontWeight: 50
}

export type CommitProgressProps = {
    progress: number;
    repo: RepogotchiType;
}

export default function CommitProgress(props: CommitProgressProps) {
    return (
        <ThemeProvider theme={theme}>
            <Box sx = {{ m: 2, lineHeight: 3, width: '100%' }}>
                <Typography variant="h5" component="h2" sx = {{ pb: 1.5, textAlign: 'center' }}>Current Level: 1</Typography>
                <Typography sx = {{ pb: 1.5, textAlign: 'center' }}>{props.repo.LevelProgress} / {props.repo.LevelReq} XP</Typography>
                <BorderLinearProgress variant="determinate" value={props.progress} />
            </Box>
        </ThemeProvider>
    )
}