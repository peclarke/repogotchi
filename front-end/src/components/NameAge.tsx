import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

const theme = createTheme();

theme.typography.h4 = {
    fontSize: '1.2rem',
    padding: -5,
    marginTop: -20,
    marginBottom: -30
}

theme.typography.h6 = {
    fontSize: '100%',
    padding: -5,
    marginTop: -20,
    marginBottom: -30,
    fontWeight: 50
}

export type NameAgeProps = {
    name: string;
    age: string;
}

export default function NameAge(props: NameAgeProps) {
    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={3} sx = {{ width: '50%', height: '100%' }}>
                <Box sx = {{ ml: 2, pb: 1, height: '100%', lineHeight: 4.5 }}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={4} alignItems="center" justifyContent="center">
                            <Typography variant="h4">Name:</Typography>
                        </Grid>
                        <Grid item xs={6} alignItems="center" justifyContent="center">
                            <Typography variant="h6">{props.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={4} alignItems="center" justifyContent="center">
                            <Typography variant="h4">Age:</Typography>
                        </Grid>
                        <Grid item xs={6} alignItems="center" justifyContent="center">
                            <Typography variant="h6">{props.age}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}