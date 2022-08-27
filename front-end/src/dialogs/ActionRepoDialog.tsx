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


export type ActionRepoDialogProps = {
    open:    boolean;
    onClose: () => void;
    action:  (txt: string) => void;
    type:    "add" | "remove";
}

export default function ActionRepoDialog(props: ActionRepoDialogProps) {
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
                    <Typography variant="h5">{props.type === "add" ? "Add Repository" : "Remove Repository"}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        { props.type === "remove"
                        ? "Please enter the name of the Github Repository to remove from the list."
                        : "Please enter the URL of the Github Repository to add"
                        }
                    </Typography>
                    <Box sx = {{ mt: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 110 }}>
                        <TextField onChange={updateText} id="repo-dialog-input" label={props.type === "add" ? "Repository URL" : "Repository Name"} variant="outlined" sx = {{ width: "100%"}} />
                        <Button variant="contained" onClick={buttonClicked} sx = {{ width: "45%"}}>{props.type === "add" ? "Add Repository" : "Remove Repository" }</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}