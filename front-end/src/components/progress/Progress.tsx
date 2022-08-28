import React, { useState } from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
  
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
height: 15,
borderRadius: 8,
width: '90%',
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
    fontSize: '0.9rem',
    fontWeight: 50
}

export type ProgressProps = {
    title:    string;
    bio:      string;
    progress: number;
}

export default function Progress(props: ProgressProps) {
    // const [progress, setProgress] = useState(props.progress);

    return (
        <ThemeProvider theme={theme}>
            <Box sx = {{ m: 2, flex: 1, flexDirection: 'column', lineHeight: 3 }}>
                <Typography variant="h5" component="h2">{props.title}</Typography>
                <Typography variant="h6">{props.bio}</Typography>
                <BorderLinearProgress variant="determinate" value={props.progress} />
            </Box>
        </ThemeProvider>
    )
}