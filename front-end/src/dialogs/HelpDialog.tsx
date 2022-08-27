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

theme.typography.h6 = {
    fontSize: '1.2rem',
    fontWeight: 300
}

export type HelpDialogProps = {
    open: boolean;
    onClose: () => void;
}

export default function HelpDialog(props: HelpDialogProps) {
    return (
        <ThemeProvider theme={theme}>
            <Dialog onClose={props.onClose} open={props.open}>
                <DialogTitle>
                    <Typography variant="h5">TamaGit Help</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        To get started, click on <strong>Add Repository</strong>. Then, insert the URL to your Github repository and click submit.
                        Follow the instructions to setup web hooks. Finally, see your Repogotchi by clicking on the panel in the list.
                    </Typography>
                    <p></p>
                    <Typography variant="h6">
                        You can only have a maximum of 4 Repogotchis at any one time. To remove one, press <strong>Remove Repository</strong> and insert the Github name
                        of the repository. Warning: This will remove it permanently from your TamaGit space.
                    </Typography>
                    <Button variant="contained" onClick={props.onClose} sx={{mt: 5}}>Ok</Button>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}