import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export type RepoListItemProps = {
    
}

export default function RepoListItem(props: RepoListItemProps) {
    const [elevation, setElevation] = useState(10);

    return (
        <Paper sx = {{ height: 45, padding: 4, ml: 5}} elevation={elevation}
               onMouseEnter={() => setElevation(20)}
               onMouseLeave={() => setElevation(10)}
        >
            <Box sx = {{ display: 'flex', flexDirection: 'row' }}>
                <Avatar sx={{ width: 130, height: 130, ml: -8, mt: -5 }}/>
                <Box sx = {{ ml: 4 }}>
                    <Typography>RepositoryOfficialName</Typography>
                    <Typography>RepoPersonalName, x/y Commits</Typography>
                </Box>
            </Box>
        </Paper>
    )
}