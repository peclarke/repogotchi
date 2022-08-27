import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

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

export type Commit = {
    index: number,
    date: string,
    msg: string,
    url: string
}

export default function Details(props: DetailsProps) {
    const [commits, setCommits] = useState<Commit[]>([]);

    const { id } = useParams();

    useEffect(() => get_commits(), []);

    const get_commits = () => {
        const url = "https://api.github.com/repos/peclarke/" + id + "/commits";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const mapped: Commit[] = [];
                if (data.length > 3) {
                    for (var i = 0; i < 4; i++) {
                        mapped.push({
                            index: i + 1,
                            date: new Date(data[i].commit.committer.date).toDateString(),
                            msg: data[i].commit.message,
                            url: data[i].html_url
                        })
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        mapped.push({
                            index: i + 1,
                            date: new Date(data[i].commit.committer.date).toDateString(),
                            msg: data[i].commit.message,
                            url: data[i].html_url
                        })
                    }
                }
                setCommits(mapped);



            }, (err) => console.log(err))
    }
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
                    <Typography variant="h5" sx={{mt: 5}}>Most Recent Commits</Typography>
                    <List dense={false}>
                        {
                        commits.map((commit, index) => {
                            return (
                                <a href={commit.url} target="_" style={{ textDecoration: 'none', color: 'black'}}>
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <GitHubIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {commit.msg}
                                        </ListItemText>
                                    </ListItem>
                                </a>
                            )
                        })
                        }
                    </List>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}