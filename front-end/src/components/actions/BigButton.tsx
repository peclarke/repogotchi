import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export type BigButtonProps = {
    action: (e: any) => void;
    type: "add" | "remove";
}

export default function BigButton(props: BigButtonProps) {
    return (
        <Button 
            variant={props.type === 'remove' ? "outlined" : "contained" }
            size="large" 
            onSubmit={props.action}
            startIcon={props.type === 'remove' ? <DeleteIcon /> : <AddIcon /> }
            sx = {{ mt: 3 }}
        >{ props.type === 'remove' ? "Remove Repository" : "Add Repository" }
        </Button>
    )
}