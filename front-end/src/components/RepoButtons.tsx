import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RepoSettingsDialog from '../dialogs/RepoSettingsDialog';

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.1rem',
    padding: 0
}

export type RepoButtonsType = {
    updateName: (text: string) => void;
}

export default function RepoButtons(props: RepoButtonsType) {
    const [settings, setSettings] = useState(false);

    return (
            <ThemeProvider theme={theme}>
                <Box display="flex" alignItems="center" justifyContent="space-evenly" sx = {{ mt: 5, pt: 5}}>
                    <Link to="/home" style = {{ textDecoration: "none"}}>
                        <Button variant="contained" size="large">
                            <Typography variant="h5">Back</Typography>
                        </Button>
                    </Link>
                    <Button onClick={() => setSettings(true)} variant="contained" size="large">
                        <Typography variant="h5">Settings</Typography>
                    </Button>
                    <RepoSettingsDialog open={settings} onClose={() => setSettings(false)} action={(text: string) => props.updateName(text)}/>
                </Box>
            </ThemeProvider>
    )
}