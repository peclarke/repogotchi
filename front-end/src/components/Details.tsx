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
import CircularProgress from '@mui/material/CircularProgress';
import useWindowDimensions from '../hooks/useWindowDimensions';

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
    const [langs, setLangs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        setLoading(true);
        get_commits();
        get_langs()
    }, []);

    const get_commits = () => {
        const url = "https://api.github.com/repos/peclarke/" + id + "/commits";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
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

    const get_langs = () => {
        const baseUrl = "https://api.github.com/repos/" + 'peclarke' + "/" + id
        fetch(baseUrl + "/languages")
            .then(res => res.json())
            .then((jsonLang) => {
                setLangs(Object.keys(jsonLang));
                setLoading(false);
            }, (err) => console.log(err))
    }
    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" alignItems="center" justifyContent="center" sx = {{ mt: 5 }}>
                <Paper elevation={3} sx = {{ width: '80%', height: '100%', p: 2 }}>
                    {
                    !loading  
                        ? <>
                            <Typography variant="h5">Languages</Typography>
                            <List dense={false}>
                                {
                                langs.map((language, index) => {
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
                        </>
                        : <Box display="flex" justifyContent="center" alignContent="center" height={height * 0.5}><CircularProgress size={90} sx = {{mt: 15}}/></Box>
                    }
                </Paper>
            </Box>
        </ThemeProvider>
    )
}