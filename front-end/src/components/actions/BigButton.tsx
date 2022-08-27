import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export type BigButtonProps = {
    action: (e: any) => void;
    type: "add" | "remove";
}

export default function BigButton(props: BigButtonProps) {
    const { width } = useWindowDimensions();
    return (
        <Button 
            variant={props.type === 'remove' ? "outlined" : "contained" }
            size="large" 
            onClick={props.action}
            startIcon={props.type === 'remove' ? <DeleteIcon /> : <AddIcon /> }
            sx = {{ mt: 3, width:  width * 0.18}}
        >{ props.type === 'remove' ? "Remove Repository" : "Add Repository" }
        </Button>
    )
}