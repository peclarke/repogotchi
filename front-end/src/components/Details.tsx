import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CodeIcon from '@mui/icons-material/Code';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

theme.typography.h3 = {
    fontSize: '1.2rem',
    padding: 0,
    marginBottom: -18
}

theme.typography.h6 = {
    fontSize: '0.8rem',
    fontWeight: 50
}

export type DetailsProps = {
    languages: string[];
}

export default function Details(props: DetailsProps) {
    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" alignItems="center" justifyContent="center" sx = {{ mt: 5 }}>
                <Paper elevation={3} sx = {{ width: '80%', height: '100%', p: 2 }}>
                    <Typography variant="h5">Languages</Typography>
                    <List dense={false}>
                        {
                        props.languages.map((language, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <CodeIcon />
                                    </ListItemIcon>
                                    <ListItemText>{language}</ListItemText>
                                </ListItem>
                            )
                        })
                        }
                    </List>
                    <br></br>
                    <Typography variant="h5">Other Statistics</Typography>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}