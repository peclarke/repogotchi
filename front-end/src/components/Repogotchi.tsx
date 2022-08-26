import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CommitProgress from './progress/CommitProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '2rem'
}

export type RepogotchiProps = {
    name: string;
    commits: number;
    goal: number;
}

export default function Repogotchi(props: RepogotchiProps) {
    return (
        <ThemeProvider theme = {theme}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style = {{ marginTop: 50}}>
                <Typography variant="h5">{props.name}</Typography>
                <br></br>
                <Skeleton
                    sx={{ bgcolor: 'grey.300' }}
                    variant="rectangular"
                    width="100%"
                    height={500}
                />
                <CommitProgress progress={40}/>
            </Box>
        </ThemeProvider>
    )
}