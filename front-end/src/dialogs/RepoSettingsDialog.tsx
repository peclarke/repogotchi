import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.5rem',
    fontWeight: 500
}


export type RepoSettingsDialog = {
    open:    boolean;
    onClose: () => void;
    action:  (txt: string) => void;
}

export default function RepoSettingsDialog(props: RepoSettingsDialog) {
    const [text, setText] = useState("");

    const updateText = (e: any) => {
        setText(e.target.value);
    }

    const buttonClicked = () => {
        props.action(text)
        props.onClose();
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog onClose={props.onClose} open={props.open}>
                <DialogTitle>
                    <Typography variant="h5">Repository Settings</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Customise the features of your repository below!
                    </Typography>
                    <Box sx = {{ mt: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 110 }}>
                        <TextField onChange={updateText} id="repo-dialog-input" label="Repository Nickname" variant="outlined" sx = {{ width: "100%"}} />
                        <Button variant="contained" onClick={buttonClicked} sx = {{ width: "45%"}}>Confirm</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}