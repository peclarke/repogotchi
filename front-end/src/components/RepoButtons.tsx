import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RepoSettingsDialog from '../dialogs/RepoSettingsDialog';

export type RepoButtonsType = {
    updateName: (text: string) => void;
}

export default function RepoButtons(props: RepoButtonsType) {
    const [settings, setSettings] = useState(false);

    return (
        // <Paper elevation = {10} sx = {{ml: 0}}>
            <Box display="flex" alignItems="center" justifyContent="space-evenly" sx = {{ mt: 5, mb: 8}}>
                <Link to="/" style = {{ textDecoration: "none"}}><Button variant="contained">Back</Button></Link>
                <Button onClick={() => setSettings(true)} variant="contained">Settings</Button>
                <RepoSettingsDialog open={settings} onClose={() => setSettings(false)} action={(text: string) => props.updateName(text)}/>
            </Box>
        // </Paper>
    )
}