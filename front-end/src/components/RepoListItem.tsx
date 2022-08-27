import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommitProgress from './progress/CommitProgress';
import Progress from './progress/Progress';

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.5rem',
    fontWeight: 50,
    marginTop: -5
}


export type RepoListItemProps = {
    
}

export default function RepoListItem(props: RepoListItemProps) {
    const [elevation, setElevation] = useState(10);

    return (
        <ThemeProvider theme={theme}>
            <Paper sx = {{ height: 45, padding: 4, ml: 5}} elevation={elevation}
                onMouseEnter={() => setElevation(20)}
                onMouseLeave={() => setElevation(10)}
            >
                <Box sx = {{ display: 'flex', flexDirection: 'row' }}>
                    <Avatar sx={{ width: 130, height: 130, ml: -8, mt: -5 }}/>
                    <Box sx = {{ ml: 4 }}>
                        <Typography variant="h5">RepositoryOfficialName</Typography>
                        <Typography>RepoPersonalName</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" sx = {{ width: '100%', mt: -1, ml: 3}}>
                        <Box sx = {{ width: '40%'}}>
                            <Progress title="" bio="Commit Goal Progress" progress={40}/>
                        </Box>
                        <Box sx = {{ width: '40%'}}>
                            <Progress title="" bio="Repo Health" progress={80}/>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}