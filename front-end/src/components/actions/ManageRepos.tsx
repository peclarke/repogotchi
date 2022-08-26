import Box from '@mui/material/Box';
import React from 'react';
import BigButton from './BigButton';

export type ManageReposProps = {

}

export default function ManageRepos(props: ManageReposProps) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <BigButton action={(e) => null} type="add"/>
            <BigButton action={(e) => null} type="remove"/>
        </Box>
    )
}