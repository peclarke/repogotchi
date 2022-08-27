import Box from '@mui/material/Box';
import React, { useState } from 'react';
import ActionRepoDialog from '../../dialogs/ActionRepoDialog';
import BigButton from './BigButton';

export type ManageReposProps = {

}

export default function ManageRepos(props: ManageReposProps) {
    const [dialogOpen, setDialogOpen] = useState(true);
    const [dialogType, setDialogType] = useState<"add" | "remove">("add");

    const openAddRepo = () => {
        setDialogType("add");
        setDialogOpen(true);
    }

    const openRemoveRepo = () => {
        setDialogType("remove");
        setDialogOpen(true);
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <BigButton action={openAddRepo} type="add"/>
            <BigButton action={openRemoveRepo} type="remove"/>
            <ActionRepoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} type={dialogType}/>
        </Box>
    )
}