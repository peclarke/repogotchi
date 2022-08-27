import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import ManageRepos from '../components/actions/ManageRepos';
import RepoListItem from '../components/RepoListItem';
import useWindowDimensions from '../hooks/useWindowDimensions';

export type RepoListScreenProps = {
    
}

export default function RepoListScreen(props: RepoListScreenProps) {
    const { height } = useWindowDimensions();

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box sx = {{ justifyContent: 'space-evenly', display: 'flex',
                                 flexDirection: 'column', height: height, background: "linear-gradient(#e66465, #9198e5)",
                                 paddingLeft: 4, paddingRight: 4}}>
                        {/* Render this with a proper list element from mui. Only allow 5 repogotchis  */}

                        <Link to="/repo/1" style = {{ textDecoration: 'none'}}>
                            <RepoListItem />
                        </Link>

                        <Link to="/repo/2" style = {{ textDecoration: 'none'}}>
                            <RepoListItem />
                        </Link>

                        <Link to="/repo/3" style = {{ textDecoration: 'none'}}>
                            <RepoListItem />
                        </Link>
    
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx = {{ ml: 5 }} >
                        <ManageRepos />
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}