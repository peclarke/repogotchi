import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import BigButton from '../components/actions/BigButton';
import ManageRepos from '../components/actions/ManageRepos';
import RepoListItem from '../components/RepoListItem';

export type RepoListScreenProps = {
    
}

export default function RepoListScreen(props: RepoListScreenProps) {


    return (
        <>
        <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box sx = {{ ml: 5, justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: 500, backgroundColor: 'red'}}>
                        <RepoListItem />
                        <RepoListItem />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx = {{ ml: 5 }}>
                        <ManageRepos />
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}