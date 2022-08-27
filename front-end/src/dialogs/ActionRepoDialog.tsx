import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

export type ActionRepoDialogProps = {
    open:    boolean;
    onClose: () => void;
    type:    "add" | "remove";
}

export default function ActionRepoDialog(props: ActionRepoDialogProps) {
    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>
            {props.type === "add" ? "Add Repository" : "Remove Repository"}
            </DialogTitle>
            
        </Dialog>
    )
}